interface Testimonial {
  quote: string;
  author: string;
  city: string;
  rating: number;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Finalmente encontrei um snack que combina prazer com saúde. A pipoca YASY é viciante!',
    author: 'Maria S.',
    city: 'São Paulo',
    rating: 5,
  },
  {
    quote:
      'Meus filhos comem sem culpa. Ingredientes premium, sabor incrível. Recomendo!',
    author: 'João P.',
    city: 'Rio de Janeiro',
    rating: 5,
  },
  {
    quote:
      'O caramelo com flor de sal é simplesmente perfeito. Não consigo parar!',
    author: 'Ana L.',
    city: 'Curitiba',
    rating: 5,
  },
  {
    quote:
      'Presente perfeito para quem ama comer bem. Embalagem linda, sabor incrível.',
    author: 'Carlos M.',
    city: 'Belo Horizonte',
    rating: 5,
  },
  {
    quote:
      'A melhor pipoca que já comi na vida. Zero açúcar e esse sabor? Impossível!',
    author: 'Fernanda R.',
    city: 'Brasília',
    rating: 5,
  },
];

function StarIcon({filled}: {filled: boolean}) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? 'text-black' : 'text-gray-300'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({rating}: {rating: number}) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({length: 5}, (_, i) => (
        <StarIcon key={i} filled={i < rating} />
      ))}
    </div>
  );
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export function TestimonialSection({
  title = 'CLIENTES FELIZES',
  subtitle = 'Veja o que nossa comunidade está dizendo',
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center uppercase tracking-wider">
          {title}
        </h2>
        <p className="mt-4 text-center text-gray-700">{subtitle}</p>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="min-w-[280px] flex-shrink-0 snap-start bg-white rounded-2xl p-6 shadow-sm border border-gray-200 lg:min-w-0"
            >
              <StarRating rating={testimonial.rating} />
              <p className="mt-4 text-sm text-gray-800 italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-bold text-black">
                {testimonial.author}
              </p>
              <p className="text-xs text-gray-600">{testimonial.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
