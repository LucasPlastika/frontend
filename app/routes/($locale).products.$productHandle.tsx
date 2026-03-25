import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { useState, useMemo } from 'react';
import type { CepShippingResult } from '~/lib/cep-shipping';
import {
  CartForm,
  Image,
  Money,
  type OptimisticCartLineInput,
} from '@shopify/hydrogen';
import type { MoneyV2 } from '@shopify/hydrogen/storefront-api-types';
import type { FetcherWithComponents } from '@remix-run/react';
import { Link } from '~/components/Link';
import { ProductCard } from '~/components/ProductCard';
import { ProductGallery } from '~/components/ProductGallery';
import { PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { isDiscounted } from '~/lib/utils';
import { TagButton } from '~/components/TagButton';

export const meta = ({ data }: { data: any }) => {
  if (!data?.product) return [{ title: 'Produto não encontrado | YASY' }];
  const p = data.product;
  return [
    { title: p.seo?.title || `${p.title} | YASY` },
    { name: 'description', content: p.seo?.description || p.description || '' },
  ];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { productHandle } = params;
  if (!productHandle)
    throw new Response('Handle não informado', { status: 400 });

  const { storefront } = context;

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  if (!product) throw new Response('Produto não encontrado', { status: 404 });

  const { products: relatedProducts } = await storefront.query(
    RELATED_PRODUCTS_QUERY,
    {
      variables: {
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    },
  );

  const related = relatedProducts.nodes.filter(
    (p: any) => p.handle !== productHandle,
  );

  return json({ product, related });
}

export async function action({ request, context: { env } }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawCep = String(formData.get('cep') ?? '').replace(/\D/g, '');
  const price = parseFloat(String(formData.get('price') ?? '0'));
  const weight = parseFloat(String(formData.get('weight') ?? '0.3'));

  if (rawCep.length !== 8) {
    return json<CepShippingResult>({ ok: false, error: 'CEP inválido. Digite os 8 dígitos.' });
  }

  let city = '';
  let state = '';
  try {
    const viaCepRes = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
    const viaCepData = (await viaCepRes.json()) as Record<string, unknown>;
    if (viaCepData?.erro) {
      return json<CepShippingResult>({ ok: false, error: 'CEP não encontrado.' });
    }
    city = (viaCepData.localidade as string) ?? '';
    state = (viaCepData.uf as string) ?? '';
  } catch {
    return json<CepShippingResult>({ ok: false, error: 'Não foi possível validar o CEP. Tente novamente.' });
  }

  const fromCep = env.MELHOR_ENVIO_FROM_CEP?.replace(/\D/g, '');
  if (!fromCep || !env.MELHOR_ENVIO_TOKEN || !env.MELHOR_ENVIO_URL) {
    return json<CepShippingResult>({ ok: false, error: 'Serviço de frete temporariamente indisponível.' });
  }

  let rates: any[] = [];
  try {
    const meRes = await fetch(`${env.MELHOR_ENVIO_URL}/api/v2/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.MELHOR_ENVIO_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'yasy-ecom/1.0 (contato@yasy.com.br)',
      },
      body: JSON.stringify({
        from: { postal_code: fromCep },
        to: { postal_code: rawCep },
        package: { height: 10, width: 15, length: 20, weight },
        options: { receipt: false, own_hand: false },
      }),
    });
    rates = (await meRes.json()) as any[];
  } catch {
    return json<CepShippingResult>({ ok: false, error: 'Erro ao calcular o frete. Tente novamente.' });
  }

  if (!Array.isArray(rates)) {
    return json<CepShippingResult>({ ok: false, error: 'Resposta inesperada da transportadora.' });
  }

  const FREE_SHIPPING_THRESHOLD = 99;
  const isFreeShipping = price >= FREE_SHIPPING_THRESHOLD;

  const options = rates
    .filter((r: any) => !r.error)
    .map((r: any) => ({
      carrier: r.company?.name ?? r.name,
      service: r.name,
      price: isFreeShipping ? 0 : parseFloat(r.price ?? '0'),
      days: r.delivery_range
        ? `${r.delivery_range.min}–${r.delivery_range.max} dias úteis`
        : `${r.delivery_time} dias úteis`,
      logo: r.company?.picture ?? null,
    }))
    .sort((a: any, b: any) => a.price - b.price);

  if (options.length === 0) {
    return json<CepShippingResult>({ ok: false, error: 'Nenhuma opção de frete disponível para este CEP.' });
  }

  return json<CepShippingResult>({ ok: true, city, state, options });
}

const METAFIELD_KEYS = [
  'ingredientes',
  'alergenos',
  'validade',
  'tabela_nutricional',
  'beneficios',
  'dietary-preferences',
] as const;

const STATUS_TAGS = new Set([
  'pré-venda',
  'pre-venda',
  'saquinho 50g',
  'lata premium 100g',
]);

function getMeta(metafields: any[], key: string): string | null {
  const idx = METAFIELD_KEYS.indexOf(key as any);
  return idx >= 0 ? (metafields?.[idx]?.value ?? null) : null;
}

function getMetaReference(metafields: any[], key: string): any | null {
  const idx = METAFIELD_KEYS.indexOf(key as any);
  return idx >= 0 ? (metafields?.[idx]?.reference ?? null) : null;
}

function getMetaReferenceNames(metafields: any[], key: string): string[] {
  const idx = METAFIELD_KEYS.indexOf(key as any);
  if (idx < 0) return [];
  const nodes = metafields?.[idx]?.references?.nodes;
  if (!Array.isArray(nodes)) return [];

  return nodes
    .map((node: any) => {
      const nameField = node.fields?.find(
        (f: any) => f.key === 'name' || f.key === 'title' || f.key === 'label',
      );
      return nameField?.value || node.handle || node.label || null;
    })
    .filter(Boolean);
}

/* ─── Accordion ──────────────────────────────────────────────────── */

function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode; defaultOpen?: boolean }[];
}) {
  const [open, setOpen] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    items.forEach((item, i) => {
      if (item.defaultOpen) initial.add(i);
    });
    return initial;
  });

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else {
        next.clear();
        next.add(i);
      }
      return next;
    });

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className="border-b border-contrast/20">
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between py-3.5 text-left"
            >
              <span className="text-sm font-bold text-contrast">
                {item.title}
              </span>
              <span
                className={`text-contrast text-lg leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'
                  }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-sm text-contrast leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function ProductPage() {
  const { product, related } = useLoaderData<typeof loader>();

  const images = product.images?.nodes ?? [];
  const metafields = product.metafields ?? [];
  const tags: string[] = product.tags ?? [];

  const isPreSale = tags.some(
    (t) => t.toLowerCase() === 'pré-venda' || t.toLowerCase() === 'pre-venda',
  );

  const featureTags = tags.filter(
    (t) => !STATUS_TAGS.has(t.toLowerCase()),
  );

  /* ── pricing ── */

  const price = product.priceRange?.minVariantPrice as MoneyV2 | undefined;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice as
    | MoneyV2
    | undefined;
  const hasDiscount =
    price && compareAtPrice && isDiscounted(price, compareAtPrice);

  const firstVariantId = product.variants?.nodes?.[0]?.id;
  const isAvailable = product.availableForSale;

  /* ── subtitle ── */

  const subtitle = product.productType || '';

  /* ── metafields ── */

  const ingredientes = getMeta(metafields, 'ingredientes');
  const alergenos = getMeta(metafields, 'alergenos');
  const validade = getMeta(metafields, 'validade');
  const tabelaNutricional = getMeta(metafields, 'tabela_nutricional');

  const parsedDietary = useMemo(
    () => getMetaReferenceNames(metafields, 'dietary-preferences'),
    [metafields],
  );

  const displayFeatures =
    parsedDietary.length > 0 ? parsedDietary : [];

  /* ── accordion items ── */

  const infoItems = useMemo(() => {
    const items: { title: string; content: string | React.ReactNode; defaultOpen?: boolean }[] = [];
    if (tabelaNutricional) items.push({
      title: 'Tabela nutricional', content: (
        <div className="nutrition-table" dangerouslySetInnerHTML={{ __html: tabelaNutricional }} />
      )
    });
    if (ingredientes)
      items.push({ title: 'Ingredientes', content: ingredientes, defaultOpen: true });
    if (alergenos) items.push({ title: 'Alérgenos', content: alergenos });
    if (validade) items.push({ title: 'Validade', content: validade });
    return items;
  }, [tabelaNutricional, ingredientes, alergenos, validade]);

  /* ── CEP ── */
  const [cep, setCep] = useState('');
  const cepFetcher = useFetcher<CepShippingResult>();
  const cepLoading = cepFetcher.state !== 'idle';
  const cepResult = cepFetcher.data ?? null;


  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-4 lg:px-0 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm font-bold uppercase text-contrast">
          <Link to="/" className="font-serif text-primary hover:text-contrast transition-colors">
            Home
          </Link>
          <span className="text-primary">→</span>
          <Link to="/collections/all" className="font-serif text-primary hover:text-contrast transition-colors">
            Produtos
          </Link>
          <span className="text-primary">→</span>
          <span className="font-serif text-contrast">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* ── Left: Gallery ── */}
          <ProductGallery images={images} title={product.title} />

          {/* ── Right: Product Info ── */}
          <div className="space-y-6">
            {/* Badges + subtitle */}
            <div className="flex items-center gap-2">
              {isPreSale && (
                <TagButton size="sm">
                  Pré-venda
                </TagButton>
              )}
              {!isAvailable && !isPreSale && (
                <span className="inline-block rounded-full bg-contrast/30 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-contrast mb-3">
                  Esgotado
                </span>
              )}
              {hasDiscount && (
                <TagButton size="sm" active>
                  Oferta
                </TagButton>
              )}
            </div>
            <div>
              {subtitle && (
                <p className="text-xs font-medium uppercase tracking-wider text-contrast mb-2">
                  {subtitle}
                </p>
              )}
              <h1 className="font-bold font-sans-2 uppercase text-contrast lg:text-6xl text-5xl">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            {price && (
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-contrast">
                  <Money withoutTrailingZeros data={price} />
                </span>
                {hasDiscount && compareAtPrice && (
                  <span className="text-2xl text-primary line-through">
                    <Money withoutTrailingZeros data={compareAtPrice} />
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            {(product.descriptionHtml?.trim() || product.description) && (
              <div className="text-sm text-contrast leading-relaxed">
                {product.descriptionHtml?.trim() ? (
                  <div
                    className="prose max-w-none text-lg text-contrast prose-blockquote:border-l-primary prose-blockquote:text-contrast prose-blockquote:not-italic prose-blockquote:pl-4 prose-a:text-contrast prose-a:underline [&_blockquote]:ml-2 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-contrast [&_blockquote]:!font-normal [&_blockquote]:my-4"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml.trim(),
                    }}
                  />
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            )}

            {/* Feature badges */}
            {displayFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {displayFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-xl bg-contrast/10 px-4 py-2 text-sm text-contrast"
                  >
                    <svg
                      className="h-5 w-5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-3 pt-2">
              {isAvailable && firstVariantId ? (
                <CartForm
                  route="/cart"
                  inputs={{
                    lines: [
                      { merchandiseId: firstVariantId, quantity: 1 },
                    ] as OptimisticCartLineInput[],
                  }}
                  action={CartForm.ACTIONS.LinesAdd}
                >
                  {(fetcher: FetcherWithComponents<any>) => (
                    <button
                      type="submit"
                      disabled={fetcher.state !== 'idle'}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-sans-2 text-2xl font-bold uppercase text-contrast transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {fetcher.state !== 'idle' ? (
                        'Adicionando...'
                      ) : (
                        <>
                          Adicionar à Sacola -
                          {price && (
                            <Money withoutTrailingZeros data={price} className='font-sans-2 text-2xl font-bold' />
                          )}
                        </>
                      )}
                    </button>
                  )}
                </CartForm>
              ) : (
                <button
                  disabled
                  className="w-full rounded-full bg-contrast/30 py-3.5 font-sans-2 text-2xl font-bold uppercase text-contrast cursor-not-allowed"
                >
                  Esgotado
                </button>
              )}
              <p className="text-center text-contrast">
                * Frete grátis acima de R$ 99 *
              </p>
            </div>

            {/* CEP calculator */}
            <div>
              <p className="text-lg text-contrast">
                <span className="font-bold">Calcular frete</span>
              </p>
              <cepFetcher.Form
                method="post"
                className="mt-2 flex gap-2"
              >
                <input type="hidden" name="price" value={price?.amount ?? 0} />
                <input
                  type="text"
                  name="cep"
                  placeholder="00000-000"
                  maxLength={9}
                  value={cep}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
                    const masked =
                      raw.length > 5
                        ? `${raw.slice(0, 5)}-${raw.slice(5)}`
                        : raw;
                    setCep(masked);
                  }}
                  disabled={cepLoading}
                  className="w-36 rounded-lg border border-contrast/30 bg-contrast px-4 py-2.5 text-sm outline-none focus:border-contrast transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={cepLoading || cep.replace(/\D/g, '').length !== 8}
                  className="rounded-lg bg-primary px-6 py-1 font-sans-2 text-2xl font-bold uppercase text-contrast transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cepLoading ? (
                    <svg
                      className="w-5 h-5 animate-spin mx-auto"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    'Calcular'
                  )}
                </button>
              </cepFetcher.Form>

              {/* Error */}
              {cepResult && !cepResult.ok && (
                <p className="mt-2 text-sm text-contrast">{cepResult.error}</p>
              )}

              {/* Results */}
              {cepResult && cepResult.ok && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-contrast/60 uppercase tracking-wider">
                    {cepResult.city} — {cepResult.state}
                  </p>
                  {cepResult.options.map((opt) => (
                    <div
                      key={`${opt.carrier}-${opt.service}`}
                      className="flex items-center justify-between rounded-lg bg-contrast/10 px-4 py-2.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-contrast leading-tight truncate">
                            {opt.carrier} | {opt.service}
                          </p>
                          <p className="text-xs text-contrast/60">{opt.days}</p>
                        </div>
                      </div>
                      <span className="ml-4 shrink-0 font-bold text-contrast">
                        {opt.price === 0 ? (
                          <span className="text-green-400">GRÁTIS</span>
                        ) : (
                          `R$ ${opt.price.toFixed(2).replace('.', ',')}`
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product info accordion */}
            {infoItems.length > 0 && (
              <div className="pt-2">
                <h2 className="mb-2 font-serif text-xl lg:text-3xl uppercase text-contrast">
                  Informações do Produto
                </h2>
                <Accordion items={infoItems} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="top-curve lg:top-curve-lg bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-0">
            <h2 className="mb-10 text-center text-4xl lg:text-6xl text-contrast">
              <span className="font-serif text-secondary">Você também </span>
              <span className="font-serif uppercase">vai gostar</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── GraphQL ────────────────────────────────────────────────────── */

const PRODUCT_QUERY = `#graphql
  query Product(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      tags
      publishedAt
      productType
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 1) {
        nodes {
          id
        }
      }
      metafields(identifiers: [
        {namespace: "custom", key: "ingredientes"}
        {namespace: "custom", key: "alergenos"}
        {namespace: "custom", key: "validade"}
        {namespace: "custom", key: "tabela_nutricional"}
        {namespace: "custom", key: "beneficios"}
        {namespace: "shopify", key: "dietary-preferences"}
      ]) {
        key
        value
        type
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
        references(first: 20) {
          nodes {
            ... on Metaobject {
              handle
              type
              fields {
                key
                value
              }
            }
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
` as const;

const RELATED_PRODUCTS_QUERY = `#graphql
  query RelatedProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 6, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
