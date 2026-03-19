import type {MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  {title: 'Política de Privacidade | YASY'},
  {
    name: 'description',
    content: 'Política de Privacidade da YASY. Saiba como tratamos seus dados pessoais.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
        <nav className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Política de Privacidade</span>
        </nav>

        <h1 className="text-3xl font-bold text-black uppercase tracking-wider mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-gray-500 mb-10">Última atualização: Fevereiro de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">1. Informações que Coletamos</h2>
            <p>
              Ao utilizar nosso site, podemos coletar as seguintes informações pessoais: nome completo, endereço de e-mail, endereço de entrega, número de telefone, dados de pagamento (processados de forma segura por nossos parceiros de pagamento) e informações de navegação (cookies, endereço IP, tipo de navegador).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">2. Como Utilizamos suas Informações</h2>
            <p>Utilizamos suas informações para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Processar e enviar seus pedidos</li>
              <li>Comunicar atualizações sobre pedidos e entregas</li>
              <li>Enviar newsletters e promoções (com seu consentimento)</li>
              <li>Melhorar a experiência de navegação no site</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">3. Compartilhamento de Dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados apenas com: processadores de pagamento (Shopify Payments), serviços de entrega (Correios, transportadoras parceiras), ferramentas de análise (Google Analytics) e autoridades competentes quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">4. Cookies</h2>
            <p>
              Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como os visitantes interagem com nosso conteúdo. Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">5. Segurança dos Dados</h2>
            <p>
              Adotamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Todas as transações financeiras são processadas com criptografia SSL.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">6. Seus Direitos (LGPD)</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Revogar o consentimento para comunicações de marketing</li>
              <li>Solicitar a portabilidade dos seus dados</li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer um desses direitos, entre em contato conosco pelo e-mail{' '}
              <a href="mailto:privacidade@yasy.com.br" className="text-black font-bold hover:underline">
                privacidade@yasy.com.br
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider">7. Contato</h2>
            <p>
              Para dúvidas sobre esta política, entre em contato:{' '}
              <a href="mailto:privacidade@yasy.com.br" className="text-black font-bold hover:underline">
                privacidade@yasy.com.br
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
