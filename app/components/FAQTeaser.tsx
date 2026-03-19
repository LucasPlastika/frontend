import {Disclosure} from '@headlessui/react';
import {Link} from '~/components/Link';
import {IconCaret} from '~/components/Icon';

interface FAQ {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQ[] = [
  {
    question: 'O que é a YASY?',
    answer:
      'A YASY é uma marca de pipoca gourmet zero açúcar, criada com expertise industrial e ingredientes de alta qualidade. Perfeita para quem busca prazer sem culpa.',
  },
  {
    question: 'Como conservar a pipoca YASY?',
    answer:
      'Guarde em local fresco e seco, longe da luz solar direta. Após abrir, consuma em até 3 dias para manter a crocância perfeita.',
  },
  {
    question: 'Qual a política de frete?',
    answer:
      'Oferecemos frete grátis para pedidos acima de R$150. O prazo de entrega padrão é de 3 a 7 dias úteis.',
  },
];

interface FAQTeaserProps {
  faqs?: FAQ[];
}

export function FAQTeaser({faqs = DEFAULT_FAQS}: FAQTeaserProps) {
  return (
    <section className="bg-neutral-50 py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center">
          Perguntas Frequentes
        </h2>
        <div className="mt-12 space-y-0">
          {faqs.map((faq) => (
            <Disclosure key={faq.question}>
              {({open}) => (
                <div className="border-b border-neutral-200">
                  <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left text-sm font-semibold text-neutral-900">
                    {faq.question}
                    <IconCaret
                      direction={open ? 'up' : 'down'}
                      className="w-4 h-4 flex-shrink-0 ml-4"
                    />
                  </Disclosure.Button>
                  <div
                    className={`${
                      open ? 'max-h-64 pb-4' : 'max-h-0'
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Disclosure.Panel static>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </div>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/pages/faq"
            className="text-neutral-900 font-semibold hover:underline"
          >
            Ver todas as perguntas →
          </Link>
        </div>
      </div>
    </section>
  );
}
