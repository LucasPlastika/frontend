import {useState} from 'react';

function PersonPlaceholder() {
  return (
    <div
      className="bg-gray-200 rounded-xl aspect-square w-full flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        className="w-16 h-16 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );
}

function AvatarPlaceholder() {
  return (
    <div
      className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0"
      aria-hidden="true"
    >
      <svg
        className="w-6 h-6 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-10 h-10 text-gray-500"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z" />
    </svg>
  );
}

const QUOTES = [
  {
    text: 'A YASY é o meu convite para a gente ser feliz junto, celebrando a vida real, sem neuras e com muito sabor. É a prova de que cuidar de si pode ser o',
    highlight: 'momento mais gostoso do seu dia.',
    author: 'Yasmin Castilho',
  },
  {
    text: 'O desafio é o mesmo: provar que saudável pode ser extremamente delicioso.',
    highlight: 'Estamos elevando o padrão do mercado.',
    author: 'Lucas Castro',
  },
];

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Citação anterior' : 'Próxima citação'}
      className="w-10 h-10 rounded-full border border-gray-500 text-gray-400 flex items-center justify-center hover:border-white hover:text-white transition-colors flex-shrink-0"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        {direction === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        )}
      </svg>
    </button>
  );
}

function QuotesCarousel() {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c === 0 ? QUOTES.length - 1 : c - 1));
  }

  function next() {
    setCurrent((c) => (c === QUOTES.length - 1 ? 0 : c + 1));
  }

  const quote = QUOTES[current];

  return (
    <div className="bg-gray-800 py-14 lg:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center gap-6 sm:gap-10">
          <ArrowButton direction="left" onClick={prev} />

          <div className="flex-1 text-center min-h-[160px] flex flex-col items-center justify-center">
            <blockquote className="text-gray-200 text-lg sm:text-xl leading-relaxed italic max-w-3xl mx-auto">
              &ldquo;{quote.text}{' '}
              <strong className="text-white font-bold not-italic">
                {quote.highlight}
              </strong>
              &rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              <AvatarPlaceholder />
              <span className="text-white font-bold text-sm">
                {quote.author}
              </span>
            </div>
          </div>

          <ArrowButton direction="right" onClick={next} />
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para citação ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FoundersSection() {
  return (
    <section className="bg-gray-100">
      {/* Founders + Header */}
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Title & description */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black uppercase tracking-wide leading-tight italic">
              União de Propósito,
              <br />
              <span className="text-gray-500">Expertise e Gestão</span>
            </h2>
            <p className="mt-8 text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              YASY nasce de uma parceria que une o melhor dos mundos:{' '}
              <strong className="text-black">
                a confiança de uma comunidade da Yasmin Castilho, e a expertise de
                quem já construiu uma indústria de sucesso, Lucas Castro founder da
                Dr. Peanut.
              </strong>
            </p>
            <p className="mt-3 text-gray-500 text-sm italic">
              Isso não é &ldquo;mais uma marca de influenciadora&rdquo;. É um novo
              modelo de negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {/* Yasmin */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
              <PersonPlaceholder />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-extrabold text-black uppercase">
                  Yasmin Castilho
                </h3>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
                  A Alma
                </p>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                  A YASY é o coração da Yasmin em forma de marca. Ela personifica{' '}
                  <strong className="text-black">
                    a leveza, a alegria e a busca por um bem-estar real
                  </strong>
                  , sem filtros. Não é sobre vender um produto, é sobre
                  compartilhar um estilo de vida onde ser feliz é fácil.
                </p>
              </div>
            </div>

            {/* Star divider (desktop) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-gray-100 p-2 rounded-full">
                <StarIcon />
              </div>
            </div>

            {/* Star divider (mobile) */}
            <div className="flex lg:hidden justify-center -my-4 z-10 relative">
              <div className="bg-gray-100 p-2 rounded-full">
                <StarIcon />
              </div>
            </div>

            {/* Lucas */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
              <PersonPlaceholder />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-extrabold text-black uppercase">
                  Lucas Castro
                </h3>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
                  O Mestre Criador
                </p>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                  O gênio por trás do sabor. Lucas é o fundador da Dr. Peanut e a
                  mente que garante{' '}
                  <strong className="text-black">
                    a qualidade e a inovação em cada detalhe
                  </strong>
                  . Sua obsessão por excelência é o que torna a pipoca YASY uma
                  experiência única e inigualável.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quotes Carousel */}
      <QuotesCarousel />
    </section>
  );
}
