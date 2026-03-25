import { Button } from './Button';
import { FeaturedSection } from './FeaturedSection';
import { Link } from './Link';

const messages: Record<
  string,
  { heading: string; description: string }
> = {
  page: {
    heading: 'Página não encontrada',
    description:
      'Esse endereço não existe ou foi movido. Confira a URL ou use os atalhos abaixo.',
  },
  product: {
    heading: 'Produto não encontrado',
    description:
      'Este item pode ter saído de linha ou o link está incorreto. Que tal explorar a loja?',
  },
  collection: {
    heading: 'Coleção não encontrada',
    description:
      'Não encontramos essa coleção. Volte para a loja ou à página inicial.',
  },
};

function Illustration404() {
  return (
    <svg
      viewBox="0 0 480 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="w-full max-w-sm md:max-w-md lg:max-w-lg"
    >
      {/* ── Scattered dots / texture ── */}
      {[
        [30, 30], [60, 160], [120, 15], [200, 175], [360, 22], [420, 155],
        [450, 40], [15, 110], [250, 10], [470, 100],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={3}
          fill="rgb(var(--color-primary))"
          opacity={0.12}
        />
      ))}

      {/* ── Wavy underline strip ── */}
      <path
        d="M60 170 Q120 158 180 170 Q240 182 300 170 Q360 158 420 170"
        stroke="rgb(var(--color-secondary))"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* ── 4  0  4 — all center-anchored at equal thirds ── */}
      <g
        fontFamily="'Open Sans', sans-serif"
        fontWeight="800"
        fontSize="148"
        fill="rgb(var(--color-primary))"
        textAnchor="middle"
        dominantBaseline="auto"
      >
        <text x="120" y="154" opacity="0.88">4</text>
        <text x="240" y="154" opacity="0.88">0</text>
        <text x="360" y="154" opacity="0.88">4</text>
      </g>

      {/* ── Small stars ── */}
      {[
        { cx: 155, cy: 60, r: 5 },
        { cx: 325, cy: 55, r: 4 },
        { cx: 145, cy: 130, r: 3 },
        { cx: 335, cy: 140, r: 4 },
      ].map((s, i) => (
        <polygon
          key={i}
          points={`${s.cx},${s.cy - s.r} ${s.cx + s.r * 0.3},${s.cy - s.r * 0.3} ${s.cx + s.r},${s.cy} ${s.cx + s.r * 0.3},${s.cy + s.r * 0.3} ${s.cx},${s.cy + s.r} ${s.cx - s.r * 0.3},${s.cy + s.r * 0.3} ${s.cx - s.r},${s.cy} ${s.cx - s.r * 0.3},${s.cy - s.r * 0.3}`}
          fill="rgb(var(--color-secondary))"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}

export function NotFound({ type = 'page' }: { type?: string }) {
  const copy = messages[type] ?? messages.page;

  return (
    <>
      <section className="relative overflow-hidden bg-secondary">
        {/* Background blobs */}
        <div
          className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-secondary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex flex-col items-center justify-center gap-8 container px-4 lg:px-0 py-16 text-center md:gap-10 md:py-20">
          {/* Illustration */}
          <Illustration404 />

          {/* Copy */}
          <div className="grid gap-3">
            <h1 className="text-heading font-bold text-primary">
              {copy.heading}
            </h1>
            <p className="mx-auto max-w-sm text-lead text-primary/60">
              {copy.description}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a className="inline-flex font-sans-2 text-xl items-center justify-center rounded-full bg-primary px-8 py-2.5 font-bold uppercase tracking-wider text-contrast transition-opacity hover:opacity-90" href="/">
              Página Inicial
            </a>
            <a className="inline-flex font-sans-2 text-xl items-center justify-center rounded-full border-2 border-contrast/60 px-8 py-2.5 font-bold uppercase tracking-widest text-contrast transition-colors hover:bg-contrast hover:text-secondary" href="/collections/all">Ver Loja</a>
          </div>

          <FeaturedSection />
        </div>
      </section>

    </>
  );
}
