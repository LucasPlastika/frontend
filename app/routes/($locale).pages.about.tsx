import { Image } from '@shopify/hydrogen';
import type { MetaFunction } from '@shopify/remix-oxygen';
import { useRef } from 'react';
import { Link } from '~/components/Link';
import { routeHeaders } from '~/data/cache';
import { useScrollClipPath } from '~/hooks/useScrollClipPath';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  { title: 'Sobre a YASY | YASY' },
  {
    name: 'description',
    content:
      'YASY é a marca que transforma bem-estar em prazer diário. Produtos deliciosos, nutrição inteligente e momentos que inspiram.',
  },
];

const pillars = [
  {
    image: "/images/pillar-authentic.png",
    icon: "/icons/icon-sunrise.svg",
    title: "Authentic Days\n(Dias Autênticos)",
    description:
      "Celebramos a vida como ela é, com suas perfeitas imperfeições. Acreditamos na beleza da autenticidade e em compartilhar momentos reais.",
  },
  {
    image: "/images/pillar-bliss-3e0a05.png",
    icon: "/icons/icon-heart.svg",
    title: "Everyday Bliss\n(Prazer Diário)",
    description:
      "Acreditamos que se cuidar tem que ser gostoso. Nossos produtos são a prova de que é possível nutrir o corpo e a alma com muito prazer.",
  },
  {
    image: "/images/pillar-radiant-502c65.png",
    icon: "/icons/icon-person.svg",
    title: "Radiant People\n(Pessoas Radiantes)",
    description:
      "Mais que seguidores, uma comunidade. Fortalecemos nossos laços e crescemos juntos, porque a felicidade compartilhada é sempre maior.",
  },
];

export default function AboutPage() {

  return (
    <>
      <section
        id="sobre"
        className="relative overflow-hidden bg-primary"

      >
        <div className="bg-secondary bottom-curve">
          <div className="relative z-10 container mx-auto flex flex-col items-center gap-10 pb-16 md:pb-32 xl:pb-48 pt-24">
            <h2 data-aos="fade-up" className="text-center font-sans-2 text-6xl lg:text-8xl font-bold uppercase text-contrast ">
              SOBRE A <span className="font-sans-2 text-6xl lg:text-8xl text-primary">YASY</span>
            </h2>

            <p data-aos="fade-up" data-aos-delay="200" className="max-w-[1000px] text-center font-owners text-contrast text-xl">
              A YASY é a marca que transforma bem-estar em prazer diário para <strong>pessoas
                que buscam equilíbrio real sem abrir mão da leveza.</strong> Acreditamos que
              o autocuidado não deveria ser complicado ou sem graça, por isso tornamos a
              vida saudável, gostosa e acessível através de produtos deliciosos,
              nutrição inteligente e momentos que inspiram.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-[56px]">
              {[
                { src: "/images/about-yasy-1.png", alt: "YASY — It's Easy To Be Happy", basis: "md:col-span-4" },
                { src: "/images/about-yasy-2.png", alt: "YASY — Sacola", basis: "md:col-span-2" },
                { src: "/images/about-yasy-3.png", alt: "YASY — Camiseta", basis: "md:col-span-2" },
                { src: "/images/about-yasy-4.png", alt: "YASY — Embalagem", basis: "md:col-span-4" },

                { src: "/images/about-yasy-5.png", alt: "YASY — Caixas empilhadas", basis: "md:col-span-3" },
                { src: "/images/about-yasy-6.png", alt: "YASY — Novidade", basis: "md:col-span-4" },
                { src: "/images/about-yasy-7.png", alt: "YASY — Logo", basis: "md:col-span-2" },
                { src: "/images/about-yasy-8.png", alt: "Yasmin Castilho — YASY", basis: "md:col-span-3" },
              ].map((img, i) => (
                <div
                  key={img.src}
                  data-aos="zoom-in"
                  data-aos-once="false"
                  data-aos-delay={i * 80}
                  className={`group shrink-0 ${img.basis}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="overflow-hidden h-full max-h-[331px] w-full rounded-2xl md:rounded-3xl object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-primary px-4 pb-16 md:px-6 md:pb-20 lg:px-12 xl:px-[144px] xl:pb-24">
          <h3 data-aos="fade-up" className="my-20 text-center font-sans-2 text-6xl lg:text-8xl uppercase text-secondary">
            It's Easy to Be Happy
            <br />
            <span className="font-sans-2 text-contrast">E a gente acredita nisso em tudo que faz</span>
          </h3>

          <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-16">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                data-aos-once="false"
                className="group flex flex-1 flex-col items-center overflow-hidden rounded-[32px] bg-contrast/10 shadow-[16px_16px_48px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out"
              >
                <div className="relative w-full max-h-[180px] md:max-h-0 overflow-hidden transition-[max-height] duration-500 ease-out md:group-hover:max-h-[232px]">
                  <div className="relative h-[180px] w-full md:h-[232px]">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      className="rounded-t-[16px] object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6 px-6 py-8 md:px-12 md:py-12">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-secondary p-4">
                    <Image
                      src={pillar.icon}
                      alt=""
                      width={40}
                      height={40}
                      aria-hidden="true"
                    />
                  </div>

                  <h4 className="whitespace-pre-line text-center lg:text-xl font-bold uppercase leading-[1.2em] text-contrast">
                    {pillar.title}
                  </h4>

                  <p className="text-center font-owners text-[16px] font-normal leading-[1.5em] text-contrast lg:text-[20px]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-primary">
        {/* Como Tudo Começou */}
        <section className="top-curve-lg bg-secondary py-16 lg:py-24">
          <div className="container mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl lg:text-6xl uppercase leading-[1.1]">
                  <span className="font-serif text-contrast">Como Tudo </span>
                  <span className="font-serif text-primary">Começou</span>
                </h2>
                <p className="mt-6 text-contrast leading-relaxed">
                  A YASY nasceu da sinergia entre alma, expertise e propósito.
                  Yasmin Castilho trouxe a comunidade — uma base engajada que
                  acredita em autenticidade e bem-estar. Lucas Castro trouxe o
                  know-how industrial, a expertise comprovada com a Dr. Peanut.
                  Juntos, criaram a marca que faltava no mercado: uma que não pede
                  para você escolher entre prazer e saúde.
                </p>
                <p className="mt-4 text-contrast leading-relaxed">
                  Cada grão de pipoca YASY é estourado com obsessão por qualidade,
                  envolvido em sabores que você vai amar, e entregue sem nenhum
                  grama de açúcar adicionado. Porque indulgência saudável não é
                  contradição — é a nossa razão de existir.
                </p>
              </div>
              <div className="rotate-3 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-image.png"
                  alt="Yasmin Castilho — YASY"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Filosofia */}
        <section className="bg-[#0B1215]">
          <div className="bottom-curve bg-secondary py-16 lg:py-24">
            <div className="container mx-auto">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <div className="-rotate-3 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/smile-4.png"
                      alt="Bastidores da produção YASY"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="text-4xl lg:text-6xl uppercase leading-[1.1]">
                    <span className="font-serif text-primary">Nossa </span>
                    <span className="font-serif text-contrast">Filosofia</span>
                  </h2>
                  <p className="mt-6 text-contrast leading-relaxed">
                    Aqui na YASY, a gente acredita que se cuidar é um momento
                    gostoso, leve e sem culpa. Rituais para você e sua família, e
                    uma pausa que faz tudo ficar ainda melhor.
                  </p>
                  <p className="mt-4 text-contrast leading-relaxed">
                    Cada produto começa com ingredientes cuidadosamente
                    selecionados. Da matéria-prima à embalagem, a sustentabilidade
                    guia cada decisão. Nossas latas são colecionáveis e
                    reutilizáveis. Nossos saquinhos são práticos e responsáveis.
                    Porque cuidar de você e do planeta não precisa ser complicado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0B1215] py-20 lg:py-28">
          <div className="flex flex-col items-center gap-6 px-6">
            <p className="text-6xl lg:text-8xl font-sans-2 text-contrast uppercase text-center">
              Pronto para experimentar?
            </p>
            <p className="text-contrast">
              Descubra o sabor que vai mudar a sua relação com snacks.
            </p>
            <img
              src="/icons/arrow_downward.svg"
              alt=""
              className="w-8 h-8"
              aria-hidden="true"
            />
            <Link
              to="/collections/all"
              className="rounded-full border-2 border-secondary px-10 py-3 text-xs font-bold text-contrast uppercase tracking-widest hover:bg-secondary hover:text-contrast transition-colors"
            >
              Ver Produtos
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
