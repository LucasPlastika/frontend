import type {MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  {title: 'Nossos Fundadores | YASY'},
  {
    name: 'description',
    content:
      'Conheça Yasmin Castilho e Lucas Castro, os fundadores da YASY. União de propósito, expertise e gestão.',
  },
];

function PersonPlaceholder() {
  return (
    <div
      className="bg-gray-200 rounded-2xl aspect-square w-full flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        className="w-20 h-20 text-gray-400"
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

export default function FoundersPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black uppercase tracking-wide leading-tight italic">
            União de Propósito,
            <br />
            <span className="text-gray-500">Expertise e Gestão</span>
          </h1>
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
      </section>

      {/* Yasmin */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <PersonPlaceholder />
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                A Alma
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-black uppercase">
                Yasmin Castilho
              </h2>
              <p className="mt-6 text-gray-700 leading-relaxed">
                A YASY é o coração da Yasmin em forma de marca. Ela personifica{' '}
                <strong className="text-black">
                  a leveza, a alegria e a busca por um bem-estar real
                </strong>
                , sem filtros. Não é sobre vender um produto, é sobre
                compartilhar um estilo de vida onde ser feliz é fácil.
              </p>
              <blockquote className="mt-6 border-l-2 border-black pl-4 italic text-gray-600">
                &ldquo;A YASY é o meu convite para a gente ser feliz junto,
                celebrando a vida real, sem neuras e com muito sabor. É a prova
                de que cuidar de si pode ser o{' '}
                <strong className="text-black not-italic">
                  momento mais gostoso do seu dia.
                </strong>
                &rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Lucas */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                O Mestre Criador
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-black uppercase">
                Lucas Castro
              </h2>
              <p className="mt-6 text-gray-700 leading-relaxed">
                O gênio por trás do sabor. Lucas é o fundador da Dr. Peanut e a
                mente que garante{' '}
                <strong className="text-black">
                  a qualidade e a inovação em cada detalhe
                </strong>
                . Sua obsessão por excelência é o que torna a pipoca YASY uma
                experiência única e inigualável.
              </p>
              <blockquote className="mt-6 border-l-2 border-black pl-4 italic text-gray-600">
                &ldquo;O desafio é o mesmo: provar que saudável pode ser
                extremamente delicioso.{' '}
                <strong className="text-black not-italic">
                  Estamos elevando o padrão do mercado.
                </strong>
                &rdquo;
              </blockquote>
            </div>
            <div className="order-1 lg:order-2">
              <PersonPlaceholder />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16">
        <div className="text-center px-6">
          <p className="text-2xl font-bold text-white uppercase tracking-wider">
            Conheça nossos produtos
          </p>
          <p className="mt-3 text-gray-400">
            Feitos com paixão, qualidade e zero açúcar.
          </p>
          <Link
            to="/collections/all"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-black uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Ver Produtos
          </Link>
        </div>
      </section>
    </div>
  );
}
