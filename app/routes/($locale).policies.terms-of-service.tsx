import type {MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  {title: 'Termos de Uso | YASY'},
  {
    name: 'description',
    content: 'Termos de Uso da YASY. Condições gerais de utilização do site e compras.',
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto py-12 lg:py-20">
      <nav className="mb-6 flex items-center gap-2 text-sm font-bold uppercase text-contrast">
          <Link to="/" className="font-serif text-primary hover:text-contrast transition-colors">
            Home
          </Link>
          <span className="text-primary">→</span>
          <span className="font-serif text-contrast">Termos de Uso</span>
        </nav>

        <h1 className="text-6xl lg:text-8xl font-sans-2 uppercase text-contrast">
          Termos <span className="font-sans-2 text-primary">de Uso</span>
        </h1>

        <p className="text-contrast mb-12 text-2xl">
          Última atualização: Fevereiro de 2026
        </p>

        <div className="space-y-8 text-contrast/90 leading-relaxed">
          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar o site yasy.com.br, você concorda com estes Termos de Uso. Se você não concorda com alguma parte destes termos, por favor não utilize nosso site. A YASY reserva-se o direito de modificar estes termos a qualquer momento, publicando a versão atualizada nesta página.
            </p>
          </section>

          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              2. Uso do Site
            </h2>
            <p>
              O site é destinado exclusivamente para uso pessoal e não comercial. É proibido reproduzir, duplicar, copiar, vender ou explorar qualquer parte do site sem autorização expressa da YASY. O conteúdo do site, incluindo textos, imagens, logos e marcas, é de propriedade da YASY ou de seus licenciadores.
            </p>
          </section>

          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              3. Conta do Usuário
            </h2>
            <p>
              Para realizar compras, pode ser necessário criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado.
            </p>
          </section>

          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              4. Produtos e Preços
            </h2>
            <p>
              Nos esforçamos para manter as informações dos produtos atualizadas e precisas. No entanto, não garantimos que as descrições, imagens ou preços estejam livres de erros. A YASY reserva-se o direito de corrigir erros e alterar preços a qualquer momento sem aviso prévio. Todos os preços estão em Reais (BRL) e incluem impostos aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              5. Pedidos e Pagamento
            </h2>
            <p>
              Ao realizar um pedido, você está fazendo uma oferta de compra. Reservamo-nos o direito de recusar ou cancelar qualquer pedido por motivos como: indisponibilidade de estoque, erros de preço ou problemas na verificação de pagamento. Os pagamentos são processados de forma segura pela plataforma Shopify.
            </p>
          </section>

          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              6. Propriedade Intelectual
            </h2>
            <p>
              A marca YASY, o logo, todos os textos, imagens, vídeos e demais conteúdos presentes no site são protegidos por direitos autorais e de propriedade intelectual. O uso não autorizado de qualquer material do site pode violar leis de direitos autorais, marcas registradas e outras leis aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              7. Limitação de Responsabilidade
            </h2>
            <p>
              A YASY não será responsável por danos indiretos, incidentais, especiais ou consequentes decorrentes do uso ou impossibilidade de uso do site ou dos produtos. Nossa responsabilidade total está limitada ao valor pago pelo produto em questão.
            </p>
          </section>

          <section>
            <h2 className="font-sans-2 text-3xl uppercase mb-3">
              8. Lei Aplicável
            </h2>
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da comarca de São Paulo - SP. Para dúvidas, entre em contato:{' '}
              <a href="mailto:contato@yasy.com.br" className="font-bold text-contrast underline hover:text-contrast/70 transition-colors">
                contato@yasy.com.br
              </a>
            </p>
          </section>
        </div>
      </div>
      <div className="top-curve-lg h-24 bg-[#0B1215]" />
    </div>
  );
}
