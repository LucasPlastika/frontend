import IconBlock from "~/../public/icons/block.svg";
import IconSpa from "~/../public/icons/spa.svg";
import IconStar from "~/../public/icons/star_border.svg";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: 'ZERO AÇÚCAR',
    description: 'Adoçada naturalmente para você curtir sem moderação.',
    icon: <img src={IconBlock} width={32} height={32} />,
  },
  {
    title: 'RICO EM FIBRAS',
    description: 'Suporta digestão e bem-estar no seu dia a dia.',
    icon: <img src={IconSpa} width={32} height={32} />,
  },
  {
    title: 'SABOR INCRÍVEL',
    description: 'Criada por especialista em produtos gourmet.',
    icon: <img src={IconStar} width={32} height={32} />,
  },
];

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
  const [titleItalic, ...titleRest] = title.split(' ');

  return (
    <section className="bg-primary">
      <div className="mx-auto container py-16 lg:py-24">
        <h2 className="text-center text-3xl md:text-5xl text-contrast">
          <span className="font-serif text-secondary">{titleItalic}</span>{' '}
          <span className="font-serif uppercase">{titleRest.join(' ')}</span>
        </h2>

        <p className="mt-6 text-contrast text-center lg:max-w-[50%] mx-auto text-lg">
          {intro}
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-contrast/10 px-6 py-10 text-center"
            >
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-secondary text-white">
                {feature.icon}
              </div>

              <h3 className="mt-5 font-sans-2 text-4xl uppercase font-bold text-contrast">
                {feature.title}
              </h3>

              <p className="mt-3 text-xl text-contrast">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
