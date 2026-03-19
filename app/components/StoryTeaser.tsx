import {Link} from '~/components/Link';

export function StoryTeaser() {
  return (
    <section className="bg-gray-900 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-wide leading-tight">
          Sabor ou Saúde?
          <br />
          <span className="text-gray-400">Os Dois!</span>
        </h2>

        <div className="mt-10 space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          <p>
            A gente sabe como é. A vontade de comer algo delicioso, que abraça a
            alma, mas surge aquela voz que diz: &ldquo;será que eu
            deveria?&rdquo; A vida já tem regras demais! E aqui a nossa é ser
            feliz.
          </p>
          <p>
            Na YASY acreditamos que o bem-estar não deve ser uma escolha difícil.
            Tem que ser saborosa e entregar aquele momento gostoso de felicidade
            e amor.
          </p>
        </div>

        <blockquote className="mt-10 mx-auto max-w-2xl border border-gray-700 rounded-2xl p-6 sm:p-8 bg-gray-800/50">
          <p className="text-gray-200 italic text-sm sm:text-base leading-relaxed">
            &ldquo;YASY é seu respiro gostoso. Aquele momento em que sorrisos e
            saúde andam de mãos dadas, sem neura, sem culpa. A gente transforma
            cuidado em alegria para você e todos ao seu redor. Simples
            assim.&rdquo;
          </p>
        </blockquote>

        <Link
          to="/pages/about"
          className="mt-10 inline-block text-white font-bold uppercase tracking-wider text-sm border-b-2 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
        >
          Conheça Nossa História →
        </Link>
      </div>
    </section>
  );
}
