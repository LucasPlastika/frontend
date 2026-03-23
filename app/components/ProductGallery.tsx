import {useState, useCallback, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';

type GalleryImage = {
  id?: string;
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
};

export function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [mainRef, mainApi] = useEmblaCarousel(
    {loop: false},
  );
  const [thumbRef] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => mainApi?.scrollTo(index),
    [mainApi],
  );

  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => setSelectedIndex(mainApi.selectedScrollSnap());
    mainApi.on('select', onSelect);
    onSelect();
    return () => {
      mainApi.off('select', onSelect);
    };
  }, [mainApi]);

  if (!images.length) return null;

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl" ref={mainRef}>
        <div className="flex gap-4">
          {images.map((img, i) => {
            const isContain = isContainImage(img, i);
            return (
              <div
                key={img.id ?? i}
                className={clsx(
                  'flex-[0_0_100%] min-w-0 overflow-hidden rounded-2xl h-[600px]',
                  isContain
                    ? 'bg-contrast flex items-center justify-center p-6'
                    : '',
                )}
              >
                <Image
                  className={clsx(
                    'w-full',
                    isContain
                      ? 'max-h-full max-w-full object-contain'
                      : 'object-cover rounded-2xl',
                  )}
                  data={img}
                  alt={img.altText || `${title} - ${i + 1}`}
                  sizes="(min-width: 64em) 50vw, 100vw"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
        </div>
      </div>

      {images.length > 1 && (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-3">
            {images.map((img, i) => {
              const isContain = isContainImage(img, i);
              return (
                <button
                  key={img.id ?? `thumb-${i}`}
                  onClick={() => onThumbClick(i)}
                  className={clsx(
                    'flex-[0_0_auto] w-24 h-24 rounded-xl overflow-hidden border-2 border-transparent opacity-60 hover:opacity-90 transition-all flex items-center justify-center',
                    isContain && 'bg-contrast p-2',
                    selectedIndex === i && 'border-primary !opacity-100',
                  )}
                >
                  <Image
                    className={clsx(
                      'max-h-full max-w-full',
                      isContain ? 'object-contain' : 'object-cover',
                    )}
                    data={img}
                    alt={img.altText || `${title} miniatura ${i + 1}`}
                    sizes="96px"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function isContainImage(img: GalleryImage, index: number): boolean {
  return !img.altText?.includes("product-gallery-full-size")
}
