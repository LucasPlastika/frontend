import type {MetaFunction} from '@shopify/remix-oxygen';
import {Disclosure} from '@headlessui/react';
import {Link} from '~/components/Link';
import {IconCaret} from '~/components/Icon';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  {title: 'Dúvidas Frequentes | YASY'},
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

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
        <nav className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Dúvidas Frequentes</span>
        </nav>

        <h1 className="text-3xl font-bold text-black uppercase tracking-wider">
          Dúvidas Frequentes
        </h1>
        <p className="mt-3 text-gray-700 mb-10">
          Tudo que você precisa saber sobre a YASY.
        </p>

        {FAQ_SECTIONS.map((section, sectionIdx) => (
          <div key={section.title}>
            <h2
              className={`text-lg font-bold text-black uppercase tracking-wider mb-4 ${
                sectionIdx === 0 ? '' : 'mt-10'
              }`}
            >
              {section.title}
            </h2>
            <div>
              {section.items.map((faq) => (
                <Disclosure key={faq.question}>
                  {({open}) => (
                    <div className="border-b border-gray-200">
                      <Disclosure.Button className="flex w-full items-center justify-between py-4 text-left text-sm font-bold text-black">
                        {faq.question}
                        <IconCaret
                          direction={open ? 'up' : 'down'}
                          className="ml-4 h-4 w-4 flex-shrink-0 text-gray-500"
                        />
                      </Disclosure.Button>
                      <div
                        className={`${
                          open ? 'max-h-96 pb-4' : 'max-h-0'
                        } overflow-hidden transition-all duration-300`}
                      >
                        <Disclosure.Panel static>
                          <p className="text-sm leading-relaxed text-gray-700">
                            {faq.answer}
                          </p>
                        </Disclosure.Panel>
                      </div>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-14 text-center">
          <p className="text-lg font-bold text-black">
            Ainda tem dúvidas?
          </p>
          <Link
            to="/pages/contact"
            className="mt-3 inline-block text-sm font-bold uppercase tracking-wider text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            Fale Conosco →
          </Link>
        </div>
      </div>
    </div>
  );
}
