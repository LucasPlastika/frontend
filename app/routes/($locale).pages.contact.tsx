import {useState} from 'react';
import type {MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  {title: 'Fale Conosco | YASY'},
  {
    name: 'description',
    content: 'Entre em contato com a YASY. Estamos aqui para ajudar.',
  },
];

const SOCIAL_LINKS = [
  {name: 'Instagram', href: '#'},
  {name: 'TikTok', href: '#'},
  {name: 'Facebook', href: '#'},
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:py-20">
        <nav className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Fale Conosco</span>
        </nav>

        <h1 className="text-3xl font-bold text-black uppercase tracking-wider">
          Fale Conosco
        </h1>
        <p className="mt-3 text-gray-700 mb-10">
          Adoramos ouvir você. Envie sua mensagem e responderemos em até 2 dias úteis.
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Formulário */}
          <div>
            {submitted ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-lg font-bold text-black">
                  Mensagem enviada!
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Obrigado pelo contato. Responderemos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-bold text-black uppercase tracking-wider"
                  >
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-bold text-black uppercase tracking-wider"
                  >
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-bold text-black uppercase tracking-wider"
                  >
                    Assunto
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="pedido">Dúvida sobre pedido</option>
                    <option value="produto">Dúvida sobre produto</option>
                    <option value="troca">Troca ou devolução</option>
                    <option value="parceria">Proposta de parceria</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-bold text-black uppercase tracking-wider"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar?"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black px-8 py-3.5 text-sm font-bold text-white uppercase tracking-wider hover:bg-gray-800 transition-colors sm:w-auto"
                >
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>

          {/* Informações */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                E-mail
              </h3>
              <a
                href="mailto:contato@yasy.com.br"
                className="mt-2 block text-black font-bold hover:underline"
              >
                contato@yasy.com.br
              </a>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Redes Sociais
              </h3>
              <div className="mt-2 flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-bold hover:underline"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Horário de Atendimento
              </h3>
              <p className="mt-2 text-black">
                Segunda a Sexta, 9h às 18h (horário de Brasília)
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Links Úteis
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                <Link to="/pages/faq" className="text-black font-bold hover:underline">
                  Dúvidas Frequentes
                </Link>
                <Link to="/policies/shipping-policy" className="text-black font-bold hover:underline">
                  Envio e Devoluções
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
