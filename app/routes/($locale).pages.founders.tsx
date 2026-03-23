import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '~/components/Link';
import { routeHeaders } from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  { title: 'Nossos Fundadores | YASY' },
  {
    name: 'description',
    content:
      'Conheça Yasmin Castilho e Lucas Castro, os fundadores da YASY. União de propósito, expertise e gestão.',
  },
];

export default function FoundersPage() {
  return (
    <div className="bg-secondary">
      {/* Hero */}
      <div className="bg-primary">
        <section className="bg-secondary py-20 lg:py-32 pb-32">
          <div className="mx-auto container px-6 text-center">
            <h1 data-aos="fade-up" className="text-center">
              <span className="text-primary font-bold font-sans-2 text-6xl lg:text-8xl uppercase text-center">UNIÃO DE PROPÓSITO,</span>
              <br />
              <span className="text-contrast font-bold font-sans-2 text-6xl lg:text-8xl uppercase text-center">EXPERTISE E GESTÃO</span>
            </h1>
            <p className="mt-8 text-contrast leading-relaxed max-w-4xl mx-auto">
              YASY nasce de uma parceria que une o melhor dos mundos:{' '}
              <strong>
                a confiança de uma comunidade da Yasmin Castilho, e a expertise
                de quem já construiu uma indústria de sucesso, Lucas Castro
                founder da Dr. Peanut.
              </strong>
              <br />
              Isso não é &ldquo;mais uma marca de influenciadora&rdquo;. É um
              novo modelo de negócio.
            </p>
          </div>
        </section>
      </div>

      {/* Yasmin */}
      <section className="top-curve-lg bg-secondary">
        <div className="bottom-curve py-20 bg-primary">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <img
                  src="/images/yasmin-founder.png"
                  alt="Yasmin Castilho"
                  className="w-full h-full object-cover shadow-[16px_16px_24px_0_rgba(0,0,0,0.24)] rounded-2xl -rotate-[5deg]"
                />
              </div>
              <div>
                <p className="text-3xl font-sans-2 text-contrast uppercase">
                  A Alma
                </p>
                <h2 className="mt-2 text-4xl lg:text-6xl uppercase leading-tight">
                  <span className="font-serif text-contrast">Yasmin </span>
                  <span className="font-serif text-secondary">Castilho</span>
                </h2>
                <p className="mt-6 max-w-[430px] text-contrast">
                  A YASY é o coração da Yasmin em forma de marca. Ela personifica{' '}
                  <strong className="text-contrast">
                    a leveza, a alegria e a busca por um bem-estar real
                  </strong>
                  , sem filtros. Não é sobre vender um produto, é sobre
                  compartilhar um estilo de vida onde ser feliz é fácil.
                </p>
                <blockquote className="mt-6 max-w-[500px] border-l-2 border-secondary pl-4 italic text-contrast">
                  &ldquo;A YASY é o meu convite para a gente ser feliz junto,
                  celebrando a vida real, sem neuras e com muito sabor. É a prova
                  de que cuidar de si pode ser o{' '}
                  <strong className="text-contrast not-italic">
                    momento mais gostoso do seu dia.
                  </strong>
                  &rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lucas */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p className="text-3xl font-sans-2 text-contrast uppercase">
                O Mestre Criador
              </p>
              <h2 className="mt-2 text-4xl lg:text-6xl uppercase leading-tight">
                <span className="font-serif text-contrast">Lucas </span>
                <span className="font-serif text-primary">Castro</span>
              </h2>
              <p className="mt-6 max-w-[500px] text-contrast">
                O gênio por trás do sabor. Lucas é o fundador da Dr. Peanut e a
                mente que garante{' '}
                <strong className="text-contrast">
                  a qualidade e a inovação em cada detalhe.
                </strong>{' '}
                Sua obsessão por excelência é o que torna a pipoca YASY uma
                experiência única e inigualável.
              </p>
              <blockquote className="mt-6 max-w-[500px] border-l-2 border-primary pl-4 italic text-contrast">
                &ldquo;O desafio é o mesmo: provar que saudável pode ser
                extremamente delicioso.{' '}
                <strong className="text-contrast not-italic">
                  Estamos elevando o padrão do mercado.
                </strong>
                &rdquo;
              </blockquote>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div>
                <img
                  src="/images/lucas-founder.png"
                  alt="Lucas Castro"
                  className="w-full h-full object-cover shadow-[16px_16px_24px_0_rgba(0,0,0,0.24)] rounded-2xl -rotate-[5deg]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B1215] top-curve-lg py-20 lg:py-28">
        <div className="flex flex-col items-center gap-6 px-6">
          <p className="text-6xl lg:text-8xl font-sans-2 text-contrast uppercase text-center">
            Conheça nossos produtos
          </p>
          <p className="text-contrast text-2xl">
            Feitos com paixão, qualidade e zero açúcar.
          </p>
          <Link
            to="/collections/all"
            className="rounded-full border-2 border-secondary px-10 py-3 text-xs font-bold text-contrast uppercase tracking-widest hover:bg-secondary hover:text-contrast transition-colors"
          >
            Ver Produtos
          </Link>
        </div>
      </section>
    </div>
  );
}
