import type { ProductCardFragment } from 'storefrontapi.generated';
import { Link } from '~/components/Link';
import { ProductCard } from '~/components/ProductCard';

export function ProductShowcase({
  products,
}: {
  products: ProductCardFragment[];
}) {
  if (!products.length) return null;

  const isSingle = products.length === 1;

  return (
    <section className="bg-primary">
      <div className="top-curve-lg py-16 lg:py-24 bg-secondary">
        <div className="mx-auto container">
          <h2 className="text-center text-contrast">
            <span className="text-primary text-6xl lg:text-8xl font-sans-2 uppercase">
              {isSingle ? 'Nosso' : 'Escolha'}{" "}
            </span>
            <span className="font-sans text-6xl lg:text-8xl font-sans-2 uppercase">
              {isSingle ? 'LANÇAMENTO' : 'SEU SABOR'}
            </span>
          </h2>

          <p className="mt-4 text-center text-contrast text-sm md:text-lg">
            {isSingle
              ? 'Conheça a pipoca que vai mudar a sua relação com snacks saudáveis.'
              : 'Dois sabores incríveis. Dois formatos. 4 maneiras de aproveitar.'}
          </p>

          <div
            className={`mt-12 ${isSingle
                ? 'flex items-center'
                : products.length <= 3
                  ? 'flex flex-wrap justify-center gap-6 [&>*]:w-full [&>*]:sm:w-[calc(50%-0.75rem)] [&>*]:lg:w-[calc(33.333%-1rem)]'
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
              className="inline-block font-sans-2 text-center text-xl rounded-full border-2 border-contrast/60 px-8 py-3 font-bold uppercase tracking-widest text-contrast transition-colors hover:bg-contrast hover:text-secondary"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom-curve-lg h-24 bg-secondary" />
    </section>
  );
}
