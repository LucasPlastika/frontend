import {Image, Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {Link} from '~/components/Link';
import {isDiscounted} from '~/lib/utils';
import { TagButton } from './TagButton';

export function ProductCard({
  product,
  className,
  loading,
  onClick,
}: {
  product: ProductCardFragment;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
}) {
  const price = (product as any).priceRange?.minVariantPrice as
    | MoneyV2
    | undefined;
  const compareAtPrice = (product as any).compareAtPriceRange?.minVariantPrice as
    | MoneyV2
    | undefined;

  const productImages = (product as any).images?.nodes as
    | Array<{url: string; altText?: string | null; width?: number; height?: number}>
    | undefined;
  const firstImage = productImages?.[0];
  const secondImage = productImages?.[1];

  const tags = (product as any).tags as string[] | undefined;

  return (
    <Link
      onClick={onClick}
      to={`/products/${product.handle}`}
      prefetch="viewport"
      className={`group flex flex-col overflow-hidden rounded-2xl ${className ?? ''}`}
    >
      <div className="relative aspect-square bg-contrast rounded-2xl flex items-center justify-center overflow-hidden p-6">
        {price &&
          compareAtPrice &&
          isDiscounted(price, compareAtPrice) && (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-contrast">
              Oferta
            </span>
          )}
        {firstImage && (
          <Image
            className={`max-h-full max-w-full object-contain drop-shadow-lg transition-all duration-500 ease-in-out ${
              secondImage
                ? 'group-hover:opacity-0 group-hover:scale-105'
                : 'group-hover:scale-105'
            }`}
            data={firstImage}
            alt={firstImage.altText || product.title}
            sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
            loading={loading ?? 'lazy'}
          />
        )}
        {secondImage && (
          <Image
            className="absolute inset-0 m-auto object-contain object-top drop-shadow-lg opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
            data={secondImage}
            alt={secondImage.altText || product.title}
            sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-3 px-4 pb-5 pt-4">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <TagButton key={tag} active={false} size="sm">{tag}</TagButton>
            ))}
          </div>
        )}

        <h3 className="font-sans-2 text-base text-center font-bold uppercase tracking-wider text-contrast md:text-4xl">
          {product.title}
        </h3>

        <span className="inline-flex font-sans-2 text-xl w-fit px-12 lg:px-24 items-center justify-center gap-2 rounded-full bg-primary py-2.5 font-bold uppercase tracking-wider text-contrast transition-opacity group-hover:opacity-90">
          Comprar
        </span>
      </div>
    </Link>
  );
}
