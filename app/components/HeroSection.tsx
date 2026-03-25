import {Link} from '~/components/Link';
import FloatingStar from '~/components/FloatingStar';
import { Image } from '@shopify/hydrogen';

export function HeroSection() {
  return (
    <section className="bg-primary">
      <div className="bottom-curve bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/images/hero-bg.png)'}}>
        <div className="mx-auto px-4 md:px-6 py-20 lg:py-32 text-center flex flex-col items-center">

          <FloatingStar size={96} responsiveSize={64} fill="rgb(var(--color-primary))" className="mb-2" />

          <h1 data-aos="fade-up" data-aos-duration="1000" className="text-center">
              <span className="flex items-baseline gap-3 md:gap-4 font-sans-2 text-secondary text-6xl lg:text-8xl">
                IT&apos;S
                <Image
                  src="/logo-orange.svg"
                  alt="YASY"
                  width={300}
                  height={60}
                  className="w-[250px] self-center lg:w-[300px]"
                />
              </span>
              <span className="font-sans-2 text-primary text-6xl lg:text-8xl">TO BE HAPPY</span>
            </h1>

          <p className="mt-8 text-base sm:text-lg text-primary max-w-xl mx-auto leading-relaxed">
            Bem-estar não precisa ser chato. Aqui na YASY, a gente acredita que se
            cuidar é um momento gostoso, leve e sem culpa. Rituais para você e sua
            família, e uma pausa que faz tudo ficar ainda melhor.
          </p>

          <p className="text-base sm:text-lg text-primary font-bold max-w-md mx-auto">
            Se você ama produtos saudáveis,{' '}
            <br className="hidden sm:block" />
            acabou de encontrar um jeito fácil de ser feliz.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/collections/all"
              className="font-sans-2 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-xl font-bold uppercase tracking-wider text-contrast transition-opacity hover:opacity-90"
            >
              Comprar Agora
            </Link>
            <Link
              to="/pages/about"
              className="font-sans-2 inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-3 text-xl font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-contrast"
            >
              Nossa História
            </Link>
          </div>

          <p className="mt-16 text-xs text-primary animate-bounce">
            Role para baixo ↓
          </p>
        </div>
      </div>
    </section>
  );
}
