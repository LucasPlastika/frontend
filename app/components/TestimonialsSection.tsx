import {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const TESTIMONIALS = [
  {
    quote:
      'Finalmente encontrei um snack que combina prazer com saúde. A pipoca YASY é viciante!',
    name: 'Maria S.',
    city: 'São Paulo',
  },
  {
    quote:
      'Meus filhos comem sem culpa. Ingredientes premium, sabor incrível. Recomendo!',
    name: 'João P.',
    city: 'Rio de Janeiro',
  },
  {
    quote:
      'O caramelo com flor de sal é simplesmente perfeito. Não consigo parar!',
    name: 'Ana L.',
    city: 'Curitiba',
  },
  {
    quote:
      'Presente perfeito para quem ama comer bem. Embalagem linda, sabor incrível.',
    name: 'Carlos M.',
    city: 'Belo Horizonte',
  },
  {
    quote:
      'A melhor pipoca que já comi na vida. Zero açúcar e esse sabor? Impossível!',
    name: 'Fernanda R.',
    city: 'Brasília',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-secondary" aria-label="5 estrelas">
      {Array.from({length: 5}).map((_, i) => (
        <svg
          key={i}
          className="h-5 w-5 fill-current"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 0 0-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957Z" />
        </svg>
      ))}
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Depoimento anterior' : 'Próximo depoimento'}
      className="hidden shrink-0 cursor-pointer opacity-50 transition-opacity hover:opacity-100 md:block"
    >
      <img
        src={direction === 'prev' ? '/arrow-left.svg' : '/arrow-right.svg'}
        alt=""
        className="h-12 w-12 object-contain"
      />
    </button>
  );
}

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-primary overflow-hidden">
      <div className="top-curve-lg py-16 lg:py-24 bg-secondary">
        <div className="mx-auto container px-4 lg:px-0">

          <h2 className="text-center text-5xl lg:text-8xl uppercase">
            <span className="font-sans-2 text-primary">Clientes </span>
            <span className="font-sans-2 text-contrast">Felizes</span>
          </h2>

          <p className="mt-4 text-center text-contrast text-lg md:text-xl">
            Veja o que nossa comunidade está dizendo
          </p>

          <div className="mt-12 flex w-full items-center gap-4 md:gap-8">
            <ArrowButton direction="prev" onClick={scrollPrev} />

            <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.name}
                    className="flex min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.667rem)] flex-col gap-4 rounded-2xl bg-contrast p-6"
                  >
                    <Stars />
                    <p className="flex-1 text-sm italic leading-relaxed text-primary/90">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-bold text-primary">{t.name}</p>
                      <p className="text-xs text-primary/60">{t.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ArrowButton direction="next" onClick={scrollNext} />
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? 'bg-contrast scale-125'
                    : 'bg-contrast/40'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
      <div className="bottom-curve-lg h-24 bg-secondary" />
    </section>
  );
}
