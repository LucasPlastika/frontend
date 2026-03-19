import type {MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  {title: 'Sobre a YASY | YASY'},
  {
    name: 'description',
    content:
      'YASY é a marca que transforma bem-estar em prazer diário. Produtos deliciosos, nutrição inteligente e momentos que inspiram.',
  },
];

const PILLARS = [
  {
    englishTitle: 'Authentic Days',
    title: 'Dias Autênticos',
    description:
      'Celebramos a vida como ela é, com suas perfeitas imperfeições. Acreditamos na beleza da autenticidade e em compartilhar momentos reais.',
    hasImage: true,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    englishTitle: 'Everyday Bliss',
    title: 'Prazer Diário',
    description:
      'Acreditamos que se cuidar tem que ser gostoso. Nossos produtos são a prova de que é possível nutrir o corpo e a alma com muito prazer.',
    hasImage: false,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    englishTitle: 'Radiant People',
    title: 'Pessoas Radiantes',
    description:
      'Mais que seguidores, uma comunidade. Fortalecemos nossos laços e crescemos juntos, porque a felicidade compartilhada é sempre maior.',
    hasImage: false,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
  },
];

function ImagePlaceholder({caption}: {caption: string}) {
  return (
    <div className="bg-gray-200 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-3">
      <svg
        className="w-12 h-12 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
        />
      </svg>
      <span className="text-gray-600 text-xs font-medium">{caption}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero — Sobre a YASY */}
      <section className="bg-gray-900 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide leading-tight">
            Sobre a <span className="italic font-light">YASY</span>
          </h1>

          <p className="mt-10 text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            YASY é a marca que transforma bem-estar em prazer diário para{' '}
            <strong className="text-white">
              pessoas que buscam equilíbrio real sem abrir mão da leveza.
            </strong>{' '}
            Acredita que autocuidado não deveria ser complicado ou sem graça, por
            isso torna a vida saudável, gostosa e acessível através de produtos
            deliciosos, nutrição inteligente e momentos que inspiram.
          </p>
        </div>
      </section>

      {/* IT'S EASY TO BE HAPPY — Pilares */}
      <section className="bg-gray-800 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-wide leading-tight italic">
              It&rsquo;s Easy to Be Happy
            </h2>
            <p className="mt-4 text-xl sm:text-2xl font-bold text-gray-300 uppercase tracking-wider">
              E a gente acredita nisso em tudo que faz
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.englishTitle}
                className="bg-gray-700/50 rounded-2xl p-6 sm:p-8 flex flex-col"
              >
                {pillar.hasImage && (
                  <div className="bg-gray-600 rounded-xl aspect-[4/3] mb-5 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                      />
                    </svg>
                  </div>
                )}

                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 mb-4">
                  {pillar.icon}
                </div>

                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  {pillar.englishTitle}
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  ({pillar.title})
                </p>

                <p className="mt-4 text-sm text-gray-300 leading-relaxed flex-1">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Tudo Começou */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider">
                Como Tudo Começou
              </h2>
              <p className="mt-6 text-gray-700 leading-relaxed">
                A YASY nasceu da sinergia entre alma, expertise e propósito.
                Yasmin Castilho trouxe a comunidade — uma base engajada que
                acredita em autenticidade e bem-estar. Lucas Castro trouxe o
                know-how industrial, a expertise comprovada com a Dr. Peanut.
                Juntos, criaram a marca que faltava no mercado: uma que não pede
                para você escolher entre prazer e saúde.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Cada grão de pipoca YASY é estourado com obsessão por qualidade,
                envolvido em sabores que você vai amar, e entregue sem nenhum
                grama de açúcar adicionado. Porque indulgência saudável não é
                contradição — é a nossa razão de existir.
              </p>
            </div>
            <ImagePlaceholder caption="Foto: Yasmin & Lucas Castro" />
          </div>
        </div>
      </section>

      {/* Nossa Filosofia */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <ImagePlaceholder caption="Foto: Bastidores da produção YASY" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider">
                Nossa Filosofia
              </h2>
              <p className="mt-6 text-gray-700 leading-relaxed">
                Aqui na YASY, a gente acredita que se cuidar é um momento
                gostoso, leve e sem culpa. Rituais para você e sua família, e
                uma pausa que faz tudo ficar ainda melhor.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Cada produto começa com ingredientes cuidadosamente
                selecionados. Da matéria-prima à embalagem, a sustentabilidade
                guia cada decisão. Nossas latas são colecionáveis e
                reutilizáveis. Nossos saquinhos são práticos e responsáveis.
                Porque cuidar de você e do planeta não precisa ser complicado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16">
        <div className="text-center px-6">
          <p className="text-2xl font-bold text-white uppercase tracking-wider">
            Pronto para experimentar?
          </p>
          <p className="mt-3 text-gray-400">
            Descubra o sabor que vai mudar a sua relação com snacks.
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
