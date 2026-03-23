import type {MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  {title: 'Envio e Devoluções | YASY'},
  {
    name: 'description',
    content: 'Informações sobre envio, prazos de entrega e política de devoluções da YASY.',
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto py-12 lg:py-20">
      <nav className="mb-6 flex items-center gap-2 font-bold uppercase text-contrast">
          <Link to="/" className="font-serif text-primary hover:text-contrast transition-colors">
            Home
          </Link>
          <span className="text-primary">→</span>
          <span className="font-serif text-contrast">Envio e Devoluções</span>
        </nav>

        <h1 className="text-6xl lg:text-8xl font-sans-2 uppercase text-contrast">
          Envio <span className="font-sans-2 text-primary">e Devoluções</span>
        </h1>

        <p className="text-contrast mb-12 text-2xl">
          Última atualização: Fevereiro de 2026
        </p>

        <div className="space-y-10 text-contrast/90 leading-relaxed">
          <section>
            <h2 className="text-3xl uppercase mb-3 font-sans-2 text-primary">
              Envio
            </h2>

            <h3 className="font-bold text-contrast">Prazos de Entrega</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Capitais e regiões metropolitanas: 3 a 7 dias úteis</li>
              <li>Interior: 5 a 12 dias úteis</li>
              <li>Regiões Norte e Nordeste: 7 a 15 dias úteis</li>
            </ul>
            <p className="mt-3">
              Os prazos começam a contar a partir da confirmação do pagamento. Pedidos realizados aos finais de semana e feriados serão processados no próximo dia útil.
            </p>

            <h3 className="font-bold text-contrast mt-6">Frete Grátis</h3>
            <p className="mt-1">
              Oferecemos frete grátis para pedidos acima de R$ 99,00 para todo o Brasil. Pedidos abaixo desse valor terão o frete calculado automaticamente no checkout com base no CEP de entrega.
            </p>

            <h3 className="font-bold text-contrast mt-6">Rastreamento</h3>
            <p className="mt-1">
              Após o envio, você receberá um e-mail com o código de rastreamento. Utilize o site dos Correios ou da transportadora parceira para acompanhar seu pedido em tempo real.
            </p>
          </section>

          <section>
            <h2 className="text-3xl uppercase mb-3 font-sans-2 text-primary">
              Devoluções e Trocas
            </h2>

            <h3 className="font-bold text-contrast">Prazo para Devolução</h3>
            <p className="mt-1">
              Você tem até 7 dias corridos após o recebimento do produto para solicitar a devolução, conforme o Código de Defesa do Consumidor (CDC). Para produtos com defeito, o prazo é de 30 dias corridos.
            </p>

            <h3 className="font-bold text-contrast mt-6">Condições para Devolução</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>O produto deve estar lacrado e em sua embalagem original</li>
              <li>Não aceitamos devoluções de produtos abertos ou consumidos (exceto em caso de defeito)</li>
              <li>A nota fiscal deve acompanhar o produto devolvido</li>
            </ul>

            <h3 className="font-bold text-contrast mt-6">Como Solicitar</h3>
            <p className="mt-1">
              Para solicitar uma devolução ou troca, envie um e-mail para{' '}
              <a href="mailto:contato@yasy.com.br" className="font-bold text-contrast underline hover:text-contrast/70 transition-colors">
                contato@yasy.com.br
              </a>{' '}
              com o número do pedido, motivo da devolução e fotos do produto (se aplicável). Responderemos em até 2 dias úteis.
            </p>

            <h3 className="font-bold text-contrast mt-6">Reembolso</h3>
            <p className="mt-1">
              Após recebermos e inspecionarmos o produto devolvido, o reembolso será processado em até 10 dias úteis na mesma forma de pagamento original. Em caso de cartão de crédito, o prazo de estorno depende da operadora.
            </p>
          </section>

          <section>
            <h2 className="text-3xl uppercase mb-3 font-sans-2 text-primary">
              Dúvidas
            </h2>

            <h3 className="font-bold text-contrast">Prazo para devolução</h3>
            <p className="mt-1">
              Você tem até 7 dias corridos após o recebimento do produto para solicitar a devolução, conforme o Código de Defesa do Consumidor (CDC). Para produtos com defeito, o prazo é de 30 dias corridos.
            </p>

            <h3 className="font-bold text-contrast mt-6">Condições para devolução</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>O produto deve estar lacrado e em sua embalagem original</li>
              <li>Não aceitamos devoluções de produtos abertos ou consumidos (exceto em caso de defeito)</li>
              <li>A nota fiscal deve acompanhar o produto devolvido</li>
            </ul>

            <h3 className="font-bold text-contrast mt-6">Como solicitar</h3>
            <p className="mt-1">
              Para solicitar uma devolução ou troca, envie um e-mail para{' '}
              <a href="mailto:contato@yasy.com.br" className="font-bold text-contrast underline hover:text-contrast/70 transition-colors">
                contato@yasy.com.br
              </a>{' '}
              com o número do pedido, motivo da devolução e fotos do produto (se aplicável). Responderemos em até 2 dias úteis.
            </p>

            <h3 className="font-bold text-contrast mt-6">Reembolso</h3>
            <p className="mt-1">
              Entre em contato com nossa equipe:{' '}
              <a href="mailto:contato@yasy.com.br" className="font-bold text-contrast underline hover:text-contrast/70 transition-colors">
                contato@yasy.com.br
              </a>{' '}
              ou acesse nossa página de{' '}
              <Link to="/pages/faq" className="font-bold text-contrast underline hover:text-contrast/70 transition-colors">
                Dúvidas Frequentes
              </Link>.
            </p>
          </section>
        </div>
      </div>
      <div className="top-curve-lg h-24 bg-[#0B1215]" />
    </div>
  );
}
