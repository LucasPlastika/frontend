import {useState} from 'react';

export function RegisterSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="relative bg-primary">
      <div className="mx-auto px-6 text-center py-16 lg:py-24">
        <h2 className="text-4xl lg:text-6xl font-medium uppercase">
          <span className="font-serif text-secondary">
            Um jeito fácil de{' '}
          </span>
          <span className="font-serif text-contrast">ser feliz</span>
        </h2>

        <div className="mx-auto max-w-2xl">
          <p className="mt-5 text-lg lg:text-xl uppercase tracking-wider text-contrast">
            Cadastre-se e ganhe 10% off no primeiro pedido.
          </p>
          <p className="mt-1 text-lg lg:text-xl text-contrast">
            Receba em primeira mão as novidades, promoções, receitas e muito mais!
          </p>

          {submitted ? (
            <p className="mt-10 text-xl lg:text-2xl text-contrast">
              <span>Formulário enviado com sucesso!</span>
              <br />
              <span className="text-secondary">Bem-vindo à família YASY!</span>
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
              <label className="flex items-center gap-3 rounded-full bg-contrast px-5 py-3">
                <svg
                  className="h-5 w-5 shrink-0 text-primary/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escreva seu nome aqui"
                  className="flex-1 bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none"
                />
              </label>

              <label className="flex items-center gap-3 rounded-full bg-contrast px-5 py-3">
                <svg
                  className="h-5 w-5 shrink-0 text-primary/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Coloque seu e-mail aqui"
                  className="flex-1 bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none"
                />
              </label>

              <label className="flex items-center gap-3 rounded-full bg-contrast px-5 py-3">
                <svg
                  className="h-5 w-5 shrink-0 text-primary/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(__) _____-____"
                  className="flex-1 bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="mt-2 rounded-full bg-secondary py-3.5 text-sm font-bold uppercase tracking-wider text-contrast transition-opacity hover:opacity-90"
              >
                Me conta, vai!
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="top-curve-lg h-48 bg-[#0B1215]" />
    </section>
  );
}
