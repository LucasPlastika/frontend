"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import FloatingStar from "./FloatingStar";

const founders = [
  {
    photo: "/images/yasmin-founder.png",
    name: "Yasmin Castilho",
    role: "A alma",
    description:
      `A YASY é o coração da Yasmin em forma de marca. Ela personifica
      <strong class="font-bold">a leveza, a alegria e a busca por um bem-estar real,</strong> sem filtros.
      Não é sobre vender um produto, é sobre compartilhar um estilo de vida onde ser feliz é fácil.`
  },
  {
    photo: "/images/lucas-founder.png",
    name: "Lucas Castro",
    role: "O Mestre Criador",
    description:
      `O gênio por trás do sabor. Lucas é o fundador da Dr. Peanut e a mente que garante a
      <strong class="font-bold">qualidade e a inovação em cada detalhe.</strong>
      Sua obsessão por excelência é o que torna a pipoca YASY uma experiência única e inigualável.
      `
  },
];

const quotes = [
  {
    text: "A YASY é o meu convite para a gente ser feliz junto, celebrando a vida real, sem neuras e com muito sabor. É a prova de que cuidar de si pode ser o momento mais gostoso do seu dia.",
    avatar: "/images/yasmin-founder.png",
    author: "Yasmin Castilho",
  },
  {
    text: "A YASY une o que eu sei fazer de melhor — criar produtos que as pessoas amam de verdade — com um propósito maior. Cada detalhe é pensado para provar que qualidade e bem-estar podem andar juntos, sem abrir mão do sabor.",
    avatar: "/images/lucas-founder.png",
    author: "Lucas Castro",
  },
];

export function FoundersSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section
      id="socios"
      className="bg-primary scroll-mt-20"
    >
      <div className="top-curve bg-secondary">
        <div className="relative z-10 mx-auto flex container px-4 lg:px-0 flex-col items-center gap-10 md:gap-16 py-16 md:pb-20 md:pt-12 lg:pb-28 lg:pt-16 xl:pb-24 xl:pt-[96px]">
          <h2 data-aos="fade-up" className="text-center">
            <span className="text-primary font-bold font-sans-2 text-6xl lg:text-8xl uppercase text-center">UNIÃO DE PROPÓSITO,</span>
            <br />
            <span className="text-contrast font-bold font-sans-2 text-6xl lg:text-8xl uppercase text-center">EXPERTISE E GESTÃO</span>
          </h2>

          <p data-aos="fade-up" data-aos-delay="200" className="max-w-[1000px] text-center  text-contrast md:text-xl">
            A YASY nasce de uma parceria que une o melhor dos mundos: <strong className="font-semibold">a confiança da comunidade da Yasmin Castilho e a expertise de quem já construiu uma indústria de sucesso — Lucas Castro, fundador da Dr. Peanut.</strong>
            <br />
            Isso não é &quot;mais uma marca de influenciadora&quot;. É um novo modelo de negócio.
          </p>

          <div data-aos="fade-up" data-aos-delay="300" className="relative flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="founder-card flex w-full flex-col gap-5 rounded-[32px] bg-contrast p-6 lg:p-12 shadow-[16px_16px_24px_rgba(0,0,0,0.16)] lg:w-1/2 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[20px_20px_32px_rgba(0,0,0,0.24)] hover:scale-[1.02] ring-2 ring-transparent hover:ring-primary/20 [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-out hover:[&_img]:scale-105"
              >
                <div className="founder-image-wrap relative rounded-[19px] p-[3px] overflow-hidden">
                  <div className="founder-border-anim" aria-hidden="true" />
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-[16px]">
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-center font-sans-2 text-5xl font-bold uppercase text-primary lg:text-6xl leading-none">
                    {founder.name}
                  </h3>
                  <p className="mb-5 text-center font-sans-2 text-3xl font-bold uppercase text-secondary lg:text-4xl leading-none">
                    {founder.role}
                  </p>
                  <p className="text-center text-primary text-base lg:text-xl">
                    <span dangerouslySetInnerHTML={{ __html: founder.description }} />
                  </p>
                </div>
              </div>
            ))}
            <FloatingStar fill="rgb(var(--color-primary))" className="absolute" />
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="flex w-full max-w-[1632px] flex-col items-center gap-4">
            <div className="flex w-full items-center gap-4 md:gap-8">
              <button
                onClick={scrollPrev}
                aria-label="Citação anterior"
                className="hidden shrink-0 cursor-pointer opacity-50 transition-opacity hover:opacity-100 md:block"
              >
                <img
                  src="/arrow-left.svg"
                  alt=""
                  className="w-16 h-16 object-cover"
                />
              </button>

              <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {quotes.map((quote, i) => (
                    <div
                      key={i}
                      className="flex min-w-0 flex-[0_0_100%] flex-col items-center gap-6 px-4 md:gap-10"
                    >
                      <p className="text-center  text-contrast text-lg lg:text-2xl md:text-3xl">
                        &ldquo;{quote.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-2 lg:gap-5">
                        <img
                          src={quote.avatar}
                          alt={quote.author}
                          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                        />
                        <span className=" text-contrast text-lg lg:text-2xl">
                          {quote.author}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollNext}
                aria-label="Próxima citação"
                className="hidden shrink-0 cursor-pointer opacity-50 transition-opacity hover:opacity-100 md:block"
              >
                <img
                  src="/arrow-right.svg"
                  alt=""
                  className="w-16 h-16 object-cover"
                />
              </button>
            </div>

            <div className="flex gap-2 md:hidden">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir para citação ${i + 1}`}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${i === selectedIndex
                    ? "bg-contrast scale-125"
                    : "bg-contrast/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-curve-lg h-24 bg-secondary" />
    </section>
  );
}
