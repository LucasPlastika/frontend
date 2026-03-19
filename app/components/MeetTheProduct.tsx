interface Feature {
  title: string;
  description: string;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: 'ZERO AÇÚCAR',
    description: 'Adoçada naturalmente para você curtir sem moderação.',
  },
  {
    title: 'RICO EM FIBRAS',
    description: 'Suporta digestão e bem-estar no seu dia a dia.',
  },
  {
    title: 'SABOR INCRÍVEL',
    description: 'Criada por especialista em produtos gourmet.',
  },
];

function FeatureIcon() {
  return (
    <svg
      className="w-10 h-10 text-gray-500 mx-auto"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  );
}

interface MeetTheProductProps {
  title?: string;
  intro?: string;
  features?: Feature[];
}

export function MeetTheProduct({
  title = 'CONHEÇA A REVOLUÇÃO',
  intro = 'Bem-estar não precisa ser chato. Se cuidar é um momento gostoso, leve e sem culpa. Nossa Pipoca Gourmet Zero Açúcar é a prova de que indulgência e saúde andam juntas.',
  features = DEFAULT_FEATURES,
}: MeetTheProductProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center uppercase tracking-wider">
          {title}
        </h2>
        <p className="mt-6 text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {intro}
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center py-8 px-6">
              <FeatureIcon />
              <h3 className="mt-4 text-lg font-bold uppercase tracking-wider text-black">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
