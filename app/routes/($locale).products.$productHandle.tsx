import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  CartForm,
  flattenConnection,
  Image,
  Money,
  type OptimisticCartLineInput,
} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {FetcherWithComponents} from '@remix-run/react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {Link} from '~/components/Link';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {isDiscounted} from '~/lib/utils';

export const meta = ({data}: {data: any}) => {
  if (!data?.product) {
    return [{title: 'Produto não encontrado | YASY'}];
  }
  const p = data.product;
  return [
    {title: p.seo?.title || `${p.title} | YASY`},
    {name: 'description', content: p.seo?.description || p.description || ''},
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {productHandle} = params;
  if (!productHandle) {
    throw new Response('Handle não informado', {status: 400});
  }

  const {storefront} = context;

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  if (!product) {
    throw new Response('Produto não encontrado', {status: 404});
  }

  const {products: relatedProducts} = await storefront.query(
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

  return json({product, related});
}

function DetailRow({label, value}: {label: string; value: string}) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <dt className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
        {label}
      </dt>
      <dd className="text-sm text-gray-800 leading-relaxed">{value}</dd>
    </div>
  );
}

function RelatedProductCard({product}: {product: ProductCardFragment}) {
  const firstVariant = flattenConnection(product.variants)[0];
  if (!firstVariant) return null;

  const {image, price, compareAtPrice} = firstVariant;

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
        {image && (
          <Image
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            data={image}
            alt={image.altText || product.title}
            sizes="(min-width: 64em) 25vw, 45vw"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-bold text-sm text-black">{product.title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-black font-bold text-sm">
            <Money withoutTrailingZeros data={price!} />
          </span>
          {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
            <span className="text-gray-400 text-xs line-through">
              <Money withoutTrailingZeros data={compareAtPrice as MoneyV2} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function formatWeight(weight: number | null | undefined, unit?: string): string {
  if (weight == null || weight <= 0) return '';
  const g = unit === 'KILOGRAMS' ? weight * 1000 : weight;
  return `${Math.round(g)}g`;
}


export default function ProductPage() {
  const {product, related} = useLoaderData<typeof loader>();

  const firstVariant = product.variants.nodes[0];
  const mainImage = product.images?.nodes?.[0];
  const galleryImages = product.images?.nodes?.slice(1, 4) || [];

  const formatOpt = firstVariant?.selectedOptions?.find(
    (o: {name: string}) => /formato|tipo|size|tamanho/i.test(o.name),
  );
  const weightStr =
    firstVariant?.weight != null
      ? formatWeight(firstVariant.weight, firstVariant.weightUnit || 'GRAMS')
      : formatOpt?.value || '';
  const formatLabel = formatOpt?.value || product.productType || '';

  const hasDiscount =
    firstVariant?.compareAtPrice &&
    isDiscounted(
      firstVariant.price as MoneyV2,
      firstVariant.compareAtPrice as MoneyV2,
    );

  const descriptionContent =
    product.descriptionHtml?.trim() || product.description?.trim();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/collections/all"
            className="hover:text-black transition-colors"
          >
            Produtos
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center p-8 overflow-hidden">
              {mainImage && (
                <Image
                  className="max-h-full max-w-full object-contain"
                  data={mainImage}
                  alt={mainImage.altText || product.title}
                  sizes="(min-width: 64em) 50vw, 100vw"
                />
              )}
            </div>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img: any, i: number) => (
                  <div
                    key={img.id || i}
                    className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4"
                  >
                    <Image
                      className="max-h-full max-w-full object-contain opacity-60"
                      data={img}
                      alt={img.altText || `${product.title} - vista ${i + 1}`}
                      sizes="(min-width: 64em) 15vw, 30vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              {!firstVariant?.availableForSale && (
                <span className="inline-block bg-gray-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  Esgotado
                </span>
              )}
              {hasDiscount && (
                <span className="inline-block bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 mr-2">
                  Oferta
                </span>
              )}
              {(formatLabel || weightStr) && (
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                  {[formatLabel, weightStr].filter(Boolean).join(' · ')}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
                {product.title}
              </h1>
            </div>

            {firstVariant && (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-black">
                  <Money withoutTrailingZeros data={firstVariant.price} />
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">
                    <Money
                      withoutTrailingZeros
                      data={firstVariant.compareAtPrice as MoneyV2}
                    />
                  </span>
                )}
              </div>
            )}

            {descriptionContent && (
              <div className="text-gray-700 leading-relaxed">
                {product.descriptionHtml?.trim() ? (
                  <div
                    className="prose prose-sm max-w-none prose-p:mb-3 last:prose-p:mb-0"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml.trim(),
                    }}
                  />
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            )}

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-2">
              {firstVariant?.availableForSale ? (
                <CartForm
                  route="/cart"
                  inputs={{
                    lines: [
                      {merchandiseId: firstVariant.id, quantity: 1},
                    ] as OptimisticCartLineInput[],
                  }}
                  action={CartForm.ACTIONS.LinesAdd}
                >
                  {(fetcher: FetcherWithComponents<any>) => (
                    <button
                      type="submit"
                      disabled={fetcher.state !== 'idle'}
                      className="w-full bg-black text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                      {fetcher.state !== 'idle'
                        ? 'Adicionando...'
                        : 'Adicionar ao Carrinho'}
                    </button>
                  )}
                </CartForm>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl cursor-not-allowed"
                >
                  Esgotado
                </button>
              )}
              <p className="text-center text-xs text-gray-500">
                Frete grátis acima de R$ 99,00
              </p>
            </div>

            {firstVariant?.sku && (
              <div className="pt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                  Informações do Produto
                </h2>
                <dl>
                  <DetailRow label="SKU" value={firstVariant.sku} />
                </dl>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-bold text-black uppercase tracking-wider mb-8">
              Você também vai gostar
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p: ProductCardFragment) => (
                <RelatedProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 10) {
        nodes {
          id
          availableForSale
          sku
          weight
          weightUnit
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            id
            url
            altText
            width
            height
          }
          selectedOptions {
            name
            value
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
