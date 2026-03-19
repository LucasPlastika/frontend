import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {Link} from '~/components/Link';
import {isDiscounted} from '~/lib/utils';

function ProductCard({product}: {product: ProductCardFragment}) {
  const firstVariant = flattenConnection(product.variants)[0];
  if (!firstVariant) return null;

  const {image, price, compareAtPrice} = firstVariant;

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
    >
      {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
        <span className="absolute top-3 right-3 z-10 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Oferta
        </span>
      )}

      <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
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

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-sm text-black leading-tight">
          {product.title}
        </h3>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-black font-bold text-sm">
            <Money withoutTrailingZeros data={price!} />
          </span>
          {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
            <span className="text-gray-400 text-xs line-through">
              <Money withoutTrailingZeros data={compareAtPrice as MoneyV2} />
            </span>
          )}
        </div>

        <span className="mt-2 inline-block w-full text-center text-xs font-bold uppercase tracking-wider bg-black text-white py-2.5 rounded-lg group-hover:bg-gray-800 transition-colors">
          Comprar
        </span>
      </div>
    </Link>
  );
}

export function ProductShowcase({
  products,
}: {
  products: ProductCardFragment[];
}) {
  if (!products || products.length === 0) return null;

  const isSingle = products.length === 1;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center uppercase tracking-wider">
          {isSingle ? 'NOSSO LANÇAMENTO' : 'ESCOLHA SEU SABOR'}
        </h2>
        <p className="mt-4 text-center text-gray-700">
          {isSingle
            ? 'Conheça a pipoca que vai mudar a sua relação com snacks saudáveis.'
            : 'Sabores incríveis para todos os momentos.'}
        </p>

        <div
          className={`mt-12 ${
            isSingle
              ? 'flex justify-center'
              : products.length <= 3
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'grid grid-cols-2 lg:grid-cols-4 gap-6'
          }`}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={isSingle ? 'w-full max-w-xs' : ''}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/collections/all"
            className="inline-block text-sm font-bold uppercase tracking-wider text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
}
