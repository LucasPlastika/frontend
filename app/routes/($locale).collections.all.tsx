import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState, useMemo} from 'react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {Link} from '~/components/Link';
import {ProductCard} from '~/components/ProductCard';
import {TagButton} from '~/components/TagButton';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';

export const meta = () => {
  return [
    {title: 'Todos os Produtos | YASY'},
    {
      name: 'description',
      content:
        'Conheça toda a linha YASY de pipocas gourmet zero açúcar.',
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const {products} = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  return json({products: products.nodes});
}

type Filter = 'all' | 'saquinho' | 'lata';

const FILTERS: {label: string; value: Filter; tag: string}[] = [
  {label: 'Todos', value: 'all', tag: ''},
  {label: 'Saquinho 50g', value: 'saquinho', tag: 'Saquinho 50g'},
  {label: 'Lata Premium 100g', value: 'lata', tag: 'LATA PREMIUM 100g'},
];

function hasTag(product: ProductCardFragment, tag: string): boolean {
  const tags = (product as any).tags as string[] | undefined;
  return tags?.some((t) => t.toLowerCase() === tag.toLowerCase()) ?? false;
}

export default function ShopAll() {
  const {products} = useLoaderData<typeof loader>();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return products;
    const match = FILTERS.find((f) => f.value === activeFilter);
    if (!match) return products;
    return products.filter((p: ProductCardFragment) => hasTag(p, match.tag));
  }, [products, activeFilter]);

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto py-10 lg:py-14">
        <nav className="mb-6 flex items-center gap-2 text-sm font-bold uppercase text-contrast">
          <Link to="/" className="font-serif text-primary hover:text-contrast transition-colors">
            Home
          </Link>
          <span className="text-primary">→</span>
          <span className="font-serif text-contrast">Todos os Produtos</span>
        </nav>

        <div className="my-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold uppercase">
            <span className="font-sans-2 text-primary">Todos </span>
            <span className="font-sans-2 text-contrast">os Produtos</span>
          </h1>
          <p className="text-contrast text-2xl">
            Pipoca gourmet zero açúcar em dois sabores incríveis e dois
            formatos. Escolha o seu favorito.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <TagButton
              key={f.value}
              active={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </TagButton>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product: ProductCardFragment) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-contrast/60 text-lg">
            Nenhum produto encontrado nessa categoria.
          </p>
        )}
      </div>
      <div className="top-curve-lg h-48 bg-[#0B1215]" />
    </div>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query CollectionAllProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 50, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
