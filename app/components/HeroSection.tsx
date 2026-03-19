import {Link} from '~/components/Link';

export function HeroSection() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32 text-center flex flex-col items-center">
        <span className="inline-block bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
          Pré-lançamento
        </span>

        <h1 className="mt-8 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-black max-w-4xl leading-[1.1]">
          É <span className="italic font-light">yasy</span>
          <br />
          <span className="text-gray-500">SER FELIZ</span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Bem-estar não precisa ser chato. Aqui na YASY, a gente acredita que se
          cuidar é um momento gostoso, leve e sem culpa. Rituais para você e sua
          família, e uma pausa que faz tudo ficar ainda melhor.
        </p>

        <p className="mt-4 text-lg sm:text-xl text-black font-bold max-w-2xl mx-auto">
          Se você ama produtos saudáveis, acabou de encontrar um jeito fácil de
          ser feliz.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/collections/all"
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-colors"
          >
            Comprar Agora
          </Link>
          <Link
            to="/pages/about"
            className="border-2 border-black text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            Nossa História
          </Link>
        </div>

        <p className="mt-16 text-xs text-gray-500 animate-bounce">
          Role para explorar ↓
        </p>
      </div>
    </section>
  );
}
