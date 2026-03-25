export function StoryTeaser() {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 lg:px-0 text-center">
        <h2 className="text-4xl lg:text-6xl font-serif uppercase">
          <span className="text-secondary font-serif">Sabor ou Saúde?</span>
          <br />
          <span className="text-contrast font-serif">Os Dois!</span>
        </h2>

        <div className="mt-10 text-contrast text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
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

        <blockquote className="mt-10 mx-auto max-w-2xl rounded-[32px] border-l-4 border-contrast bg-contrast/5 p-6 aos-init aos-animate">
          <p className="text-contrast italic text-sm sm:text-base leading-relaxed">
            &ldquo;YASY é seu respiro gostoso. Aquele momento em que sorrisos e
            saúde andam de mãos dadas, sem neura, sem culpa. A gente transforma
            cuidado em alegria para você e todos ao seu redor. Simples
            assim.&rdquo;
          </p>
        </blockquote>

        <div className="flex mt-12 w-full items-start gap-4">
          <div className="flex w-full flex-col gap-4">
            <img
              src="/images/smile-1.png"
              alt="Pessoa sorrindo"
              className="w-full h-[320px] object-cover rounded-2xl"
              loading="lazy"
            />
            <img
              src="/images/smile-2.png"
              alt="Amigos rindo juntos"
              className="w-full h-[255px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>

          <div className="flex w-full flex-col gap-4">
            <img
              src="/images/smile-3.png"
              alt="Casal feliz"
              className="w-full h-[255px] object-cover rounded-2xl"
              loading="lazy"
            />
            <img
              src="/images/smile-4.png"
              alt="Grupo de amigos com snacks"
              className="w-full h-[320px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
