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
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
        <nav className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Envio e Devoluções</span>
        </nav>

        <h1 className="text-3xl font-bold text-black uppercase tracking-wider mb-2">
          Envio e Devoluções
        </h1>
        <p className="text-sm text-gray-500 mb-10">Última atualização: Fevereiro de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">Envio</h2>

            <h3 className="text-base font-bold text-black mt-4">Prazos de Entrega</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Capitais e regiões metropolitanas:</strong> 3 a 7 dias úteis</li>
              <li><strong>Interior:</strong> 5 a 12 dias úteis</li>
              <li><strong>Regiões Norte e Nordeste:</strong> 7 a 15 dias úteis</li>
            </ul>
            <p className="mt-2">Os prazos começam a contar a partir da confirmação do pagamento. Pedidos realizados aos finais de semana e feriados serão processados no próximo dia útil.</p>

            <h3 className="text-base font-bold text-black mt-6">Frete Grátis</h3>
            <p>
              Oferecemos frete grátis para pedidos acima de <strong>R$ 99,00</strong> para todo o Brasil. Pedidos abaixo desse valor terão o frete calculado automaticamente no checkout com base no CEP de entrega.
            </p>

            <h3 className="text-base font-bold text-black mt-6">Rastreamento</h3>
            <p>
              Após o envio, você receberá um e-mail com o código de rastreamento. Utilize o site dos Correios ou da transportadora parceira para acompanhar seu pedido em tempo real.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">Devoluções e Trocas</h2>

            <h3 className="text-base font-bold text-black mt-4">Prazo para Devolução</h3>
            <p>
              Você tem até <strong>7 dias corridos</strong> após o recebimento do produto para solicitar a devolução, conforme o Código de Defesa do Consumidor (CDC). Para produtos com defeito, o prazo é de <strong>30 dias corridos</strong>.
            </p>

            <h3 className="text-base font-bold text-black mt-6">Condições para Devolução</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>O produto deve estar lacrado e em sua embalagem original</li>
              <li>Não aceitamos devoluções de produtos abertos ou consumidos (exceto em caso de defeito)</li>
              <li>A nota fiscal deve acompanhar o produto devolvido</li>
            </ul>

            <h3 className="text-base font-bold text-black mt-6">Como Solicitar</h3>
            <p>
              Para solicitar uma devolução ou troca, envie um e-mail para{' '}
              <a href="mailto:contato@yasy.com.br" className="text-black font-bold hover:underline">
                contato@yasy.com.br
              </a>{' '}
              com o número do pedido, motivo da devolução e fotos do produto (se aplicável). Responderemos em até 2 dias úteis.
            </p>

            <h3 className="text-base font-bold text-black mt-6">Reembolso</h3>
            <p>
              Após recebermos e inspecionarmos o produto devolvido, o reembolso será processado em até <strong>10 dias úteis</strong> na mesma forma de pagamento original. Em caso de cartão de crédito, o prazo de estorno depende da operadora.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">Dúvidas?</h2>
            <p>
              Entre em contato com nossa equipe:{' '}
              <a href="mailto:contato@yasy.com.br" className="text-black font-bold hover:underline">
                contato@yasy.com.br
              </a>{' '}
              ou acesse nossa página de{' '}
              <Link to="/pages/faq" className="text-black font-bold hover:underline">
                Dúvidas Frequentes
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
