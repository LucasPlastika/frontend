import { useState } from 'react';
import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '~/components/Link';
import { routeHeaders } from '~/data/cache';

export const headers = routeHeaders;

export const meta: MetaFunction = () => [
  { title: 'Fale Conosco | YASY' },
  {
    name: 'description',
    content: 'Entre em contato com a YASY. Estamos aqui para ajudar.',
  },
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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 lg:px-0 py-12 lg:py-20">
        <nav className="mb-6 flex items-center gap-2 text-sm font-bold uppercase text-contrast">
          <Link to="/" className="font-serif text-primary hover:text-contrast transition-colors">
            Home
          </Link>
          <span className="text-primary">→</span>
          <span className="font-serif text-contrast">Fale Conosco</span>
        </nav>

        <h1 className="text-6xl lg:text-8xl font-sans-2 uppercase text-contrast">
          Fale <span className="font-sans-2 text-primary">Conosco</span>
        </h1>
        <p className="mt-3 text-contrast mb-12 text-2xl">
          Adoramos ouvir você. Envie sua mensagem e responderemos em até 2 dias úteis.
        </p>

        <div className="grid lg:gap-x-8 gap-y-8 w-full grid-cols-1 lg:grid-cols-3 items-start">
          {/* Form card */}
          <div className="rounded-3xl bg-contrast p-6 md:p-8 col-span-2">
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-lg font-bold text-primary">
                  Mensagem enviada!
                </p>
                <p className="mt-2 text-primary">
                  Obrigado pelo contato. Responderemos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <img
                    src="/icons/person.svg"
                    alt=""
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    aria-hidden="true"
                  />
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Escreva seu nome aqui"
                    className="w-full text-primary rounded-xl border border-contrast bg-white pl-12 pr-4 py-3 focus:border-contrast focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <img
                    src="/icons/email.svg"
                    alt=""
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    aria-hidden="true"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Coloque seu e-mail aqui"
                    className="w-full text-primary rounded-xl border border-contrast bg-white pl-12 pr-4 py-3 focus:border-contrast focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-contrast bg-white px-4 py-3 text-primary transition-colors"
                  >
                    <option value="" className="text-primary">
                      Selecione um assunto
                    </option>
                    <option value="pedido" className="text-primary">
                      Dúvida sobre pedido
                    </option>
                    <option value="produto" className="text-primary">
                      Dúvida sobre produto
                    </option>
                    <option value="troca" className="text-primary">
                      Troca ou devolução
                    </option>
                    <option value="parceria" className="text-primary">
                      Proposta de parceria
                    </option>
                    <option value="outro" className="text-primary">
                      Outro
                    </option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-contrast"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Escreva a mensagem aqui para podermos ajudá-lo..."
                  className="w-full rounded-xl text-primary border border-contrast bg-white px-4 py-3 text-contrast -contrast focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full text-2xl font-sans-2 rounded-full bg-primary px-8 py-3.5 font-bold text-contrast uppercase hover:opacity-90 transition-opacity"
                >
                  Enviar Mensagem →
                </button>
              </form>
            )}
          </div>

          {/* Info card */}
          <div className="rounded-3xl bg-primary p-6 md:p-8 w-full text-contrast space-y-6">
            <div>
              <h3 className="font-bold">E-mail</h3>
              <a
                href="mailto:contato@yasy.com.br"
                className="mt-1 block text-contrast hover:text-contrast transition-colors"
              >
                contato@yasy.com.br
              </a>
            </div>
            <div>
              <h3 className="font-bold">Redes sociais</h3>
              <p className="mt-1 text-contrast">
                Instagram · TikTok · Facebook
              </p>
            </div>
            <div>
              <h3 className="font-bold">Horário de atendimento</h3>
              <p className="mt-1 text-contrast">
                Segunda a Sexta, 9h às 18h (horário de Brasília)
              </p>
            </div>
            <div>
              <h3 className="font-bold">Links úteis</h3>
              <div className="mt-1 flex flex-col gap-1">
                <Link
                  to="/pages/faq"
                  className="text-contrast hover:text-contrast transition-colors"
                >
                  Dúvidas frequentes →
                </Link>
                <Link
                  to="/policies/shipping-policy"
                  className="text-contrast hover:text-contrast transition-colors"
                >
                  Envio e devoluções →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="top-curve-lg h-24 bg-[#0B1215]" />
    </div>
  );
}
