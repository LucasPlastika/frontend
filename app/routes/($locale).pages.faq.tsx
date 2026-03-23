import { useState } from 'react';
import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '~/components/Link';
import { routeHeaders } from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  { title: 'Dúvidas Frequentes | YASY' },
  {
    name: 'description',
    content:
      'Respostas para as perguntas mais comuns sobre os produtos YASY, entregas, devoluções e mais.',
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const FAQ_SECTIONS: FAQSection[] = [
  {
    title: 'Sobre os Produtos',
    items: [
      {
        question: 'O que é YASY?',
        answer:
          'YASY é uma marca de pipoca gourmet zero açúcar que transforma bem-estar em prazer diário. Nossos produtos são desenvolvidos com ingredientes premium, combinando sabor incrível com nutrição inteligente.',
      },
      {
        question: 'Os produtos da YASY realmente não têm açúcar?',
        answer:
          'Sim! Todos os nossos produtos são zero açúcar adicionado. Utilizamos adoçantes naturais para garantir o sabor sem comprometer a saúde.',
      },
      {
        question: 'Quais sabores estão disponíveis?',
        answer:
          'Atualmente oferecemos dois sabores: Caramelo com Flor de Sal e Chocolate Belga. Cada sabor está disponível em formato saquinho on-the-go (40g) e lata premium colecionável (100g).',
      },
      {
        question: 'Os produtos da YASY são veganos?',
        answer:
          'A linha Caramelo com Flor de Sal é vegana e sem glúten. A linha Chocolate Belga contém leite na composição do chocolate. Consulte a lista completa de ingredientes na página de cada produto.',
      },
      {
        question: 'Os produtos são sem glúten?',
        answer:
          'Sim, todos os produtos YASY são sem glúten e sem OGM (organismos geneticamente modificados).',
      },
      {
        question: 'Qual a validade dos produtos?',
        answer:
          'Nossos produtos têm validade de 12 meses a partir da data de fabricação. A data está impressa na embalagem.',
      },
    ],
  },
  {
    title: 'Pedidos e Entregas',
    items: [
      {
        question: 'Qual o prazo de entrega?',
        answer:
          'O prazo varia de acordo com sua região: Capitais e regiões metropolitanas (3-7 dias úteis), Interior (5-12 dias úteis), Norte e Nordeste (7-15 dias úteis). O prazo começa a contar após a confirmação do pagamento.',
      },
      {
        question: 'Vocês oferecem frete grátis?',
        answer:
          'Sim! Frete grátis para pedidos acima de R$ 99,00 para todo o Brasil.',
      },
      {
        question: 'Como rastreio meu pedido?',
        answer:
          'Após o envio, você receberá um e-mail com o código de rastreamento. Use o site dos Correios ou da transportadora para acompanhar em tempo real.',
      },
      {
        question: 'Quais formas de pagamento são aceitas?',
        answer:
          'Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), PIX e boleto bancário. Os pagamentos são processados de forma segura pela plataforma Shopify.',
      },
    ],
  },
  {
    title: 'Trocas e Devoluções',
    items: [
      {
        question: 'Qual a política de devolução?',
        answer:
          'Você pode solicitar a devolução em até 7 dias corridos após o recebimento (direito de arrependimento, CDC). Para produtos com defeito, o prazo é de 30 dias. O produto deve estar lacrado e em sua embalagem original.',
      },
      {
        question: 'Como solicito uma troca ou devolução?',
        answer:
          'Envie um e-mail para contato@yasy.com.br com o número do pedido, motivo e fotos (se aplicável). Responderemos em até 2 dias úteis.',
      },
      {
        question: 'Em quanto tempo recebo o reembolso?',
        answer:
          'Após recebermos e inspecionarmos o produto, o reembolso é processado em até 10 dias úteis na mesma forma de pagamento original.',
      },
    ],
  },
  {
    title: 'Sobre a Marca',
    items: [
      {
        question: 'Quem está por trás da YASY?',
        answer:
          'A YASY nasceu da parceria entre Yasmin Castilho, influenciadora e criadora de comunidade, e Lucas Castro, fundador da Dr. Peanut e especialista em indústria de alimentos. Uma união de propósito, expertise e gestão.',
      },
      {
        question: 'A YASY é uma marca de influenciadora?',
        answer:
          'Não. A YASY é um novo modelo de negócio que combina a confiança de uma comunidade autêntica com a expertise de quem já construiu uma indústria de sucesso. É uma marca de produtos de verdade, com qualidade industrial e compromisso com a excelência.',
      },
    ],
  },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      {items.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={faq.question} className="border-b border-contrast/20">
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-lg text-contrast">{faq.question}</span>
              <svg
                className={`ml-4 h-4 w-4 flex-shrink-0 text-contrast/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="rgb(var(--color-primary))"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-lg leading-relaxed text-contrast">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <div className="bg-primary">
        <div className="bottom-curve bg-secondary">
          <div className="container py-12 lg:py-20 mb-24 mx-auto">
            <nav className="mb-6 flex items-center gap-2 text-sm font-bold uppercase text-contrast">
              <Link to="/" className="font-serif text-primary hover:text-contrast transition-colors">
                Home
              </Link>
              <span className="text-primary">→</span>
              <Link to="/pages/faq" className="font-serif text-contrast transition-colors">
                Dúvidas Frequentes
              </Link>
            </nav>

            <h1 className="text-6xl lg:text-8xl font-sans-2 uppercase text-contrast">
              Dúvidas <span className="font-sans-2 text-primary">Frequentes</span>
            </h1>

            <p className="mt-3 text-contrast mb-12 text-2xl">
              Tudo que você precisa saber sobre a YASY.
            </p>

            {FAQ_SECTIONS.map((section, sectionIdx) => (
              <div key={section.title} className={sectionIdx === 0 ? '' : 'mt-10'}>
                <h2 className="text-3xl font-sans-2 text-contrast uppercase mb-2">
                  {section.title}
                </h2>
                <FAQAccordion items={section.items} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="flex flex-col items-center gap-6 px-6 py-32">
          <p className="text-6xl lg:text-8xl font-sans-2 text-contrast uppercase text-center">
            Ainda tem dúvidas?
          </p>
          <Link
            to="/pages/contact"
            className="rounded-full border-2 border-contrast px-10 py-3 text-xs font-bold text-contrast uppercase tracking-widest hover:bg-contrast hover:text-secondary transition-colors"
          >
            Fale Conosco
          </Link>
        </div>
        <div className="top-curve-lg h-24 bg-[#0B1215]" />
      </div>
    </>
  );
}
