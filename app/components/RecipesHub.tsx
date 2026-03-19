function RecipeImagePlaceholder({label}: {label: string}) {
  return (
    <div className="aspect-[3/2] bg-gray-200 flex flex-col items-center justify-center gap-2">
      <svg
        className="w-8 h-8 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
        />
      </svg>
      <span className="text-gray-600 text-[10px] font-medium text-center px-3 leading-tight">
        {label}
      </span>
    </div>
  );
}

interface Recipe {
  title: string;
}

const DEFAULT_RECIPES: Recipe[] = [
  {title: '3 Receitas Doces com YASY Chocolate Belga'},
  {title: 'Pipoca YASY em Receitas Salgadas Gourmet'},
  {title: 'Snack Perfeito: Combinações com YASY'},
  {title: 'YASY no Brunch: Ideias Criativas'},
  {title: 'Presente Perfeito: Caixa Gourmet com YASY'},
  {title: 'Bem-Estar Diário: Rotina com YASY'},
];

interface RecipesHubProps {
  title?: string;
  subtitle?: string;
  recipes?: Recipe[];
}

export function RecipesHub({
  title = 'RECEITAS & INSPIRAÇÃO',
  subtitle = 'Descubra novas formas de aproveitar a YASY',
  recipes = DEFAULT_RECIPES,
}: RecipesHubProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center uppercase tracking-wider">
          {title}
        </h2>
        <p className="mt-4 text-center text-gray-700">{subtitle}</p>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0">
          {recipes.map((recipe) => (
            <div
              key={recipe.title}
              className="min-w-[280px] flex-shrink-0 snap-start rounded-2xl overflow-hidden shadow-sm border border-gray-200 lg:min-w-0"
            >
              <RecipeImagePlaceholder label={recipe.title} />
              <div className="p-4">
                <h3 className="font-bold text-sm text-black">
                  {recipe.title}
                </h3>
                <span className="mt-2 inline-block text-gray-700 text-xs font-bold uppercase tracking-wider">
                  VER RECEITA →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
