import {useState} from 'react';

interface NewsletterSectionProps {
  headline?: string;
  subheadline?: string;
  description?: string;
  buttonText?: string;
  successMessage?: string;
}

export function NewsletterSection({
  headline = 'UM JEITO FÁCIL DE SER FELIZ',
  subheadline = 'GANHE 15% DE DESCONTO NO PRIMEIRO PEDIDO.',
  description = 'Receba em primeira mão as novidades, promoções, receitas e muito mais!',
  buttonText = 'INSCREVER-SE',
  successMessage = 'Bem-vindo à família YASY!',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section className="bg-black py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
          {headline}
        </h2>
        <p className="mt-4 text-xl font-bold text-gray-100">{subheadline}</p>
        <p className="mt-2 text-gray-300">{description}</p>

        {submitted ? (
          <p className="mt-8 text-white text-lg font-bold">{successMessage}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="w-full sm:w-auto sm:flex-1 rounded-full bg-gray-800 border border-gray-600 px-6 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-black font-bold rounded-full px-8 py-3 text-sm hover:bg-gray-200 transition-colors"
            >
              {buttonText}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
