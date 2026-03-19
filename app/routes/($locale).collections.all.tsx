import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {Link} from '~/components/Link';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {isDiscounted} from '~/lib/utils';

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

function ProductCard({product}: {product: ProductCardFragment}) {
  const firstVariant = flattenConnection(product.variants)[0];
  if (!firstVariant) return null;

  const {image, price, compareAtPrice} = firstVariant;

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
          <span className="absolute top-3 right-3 z-10 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Oferta
          </span>
        )}
        <div className="aspect-square bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
          {image && (
            <Image
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              data={image}
              alt={image.altText || product.title}
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              loading="lazy"
            />
          )}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h2 className="font-bold text-base text-black leading-tight">
          {product.title}
        </h2>

        <div className="flex items-baseline gap-2">
          <span className="text-black font-bold text-lg">
            <Money withoutTrailingZeros data={price!} />
          </span>
          {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
            <span className="text-gray-400 text-sm line-through">
              <Money withoutTrailingZeros data={compareAtPrice as MoneyV2} />
            </span>
          )}
        </div>

        <span className="inline-block w-full text-center text-xs font-bold uppercase tracking-wider bg-black text-white py-3 rounded-lg group-hover:bg-gray-800 transition-colors">
          Ver Produto
        </span>
      </div>
    </Link>
  );
}

export default function ShopAll() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Produtos</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black uppercase tracking-wider">
            Nossos Produtos
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl">
            Pipoca gourmet zero açúcar. Indulgência saudável em cada mordida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: ProductCardFragment) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
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
