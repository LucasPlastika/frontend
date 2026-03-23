import {Image} from '@shopify/hydrogen';
import {Link} from '~/components/Link';

interface BlogArticle {
  id: string;
  title: string;
  handle: string;
  publishedAt: string;
  excerpt?: string | null;
  blog: {handle: string};
  image?: {
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
}

const FALLBACK_RECIPES = [
  {image: '/images/receita-6.png', title: '3 Receitas Doces com YASY Chocolate Belga', to: '/pages/blog'},
  {image: '/images/receita-3.png', title: 'Pipoca YASY em Receitas Salgadas Gourmet', to: '/pages/blog'},
  {image: '/images/receita-1.png', title: 'Snack Perfeito: Combinações com YASY', to: '/pages/blog'},
  {image: '/images/receita-5.png', title: 'YASY no Brunch: Ideias Criativas', to: '/pages/blog'},
  {image: '/images/receita-2.png', title: 'Presente Perfeito: Caixa Gourmet com YASY', to: '/pages/blog'},
  {image: '/images/receita-4.png', title: 'Bem-Estar Diário: Rotina com YASY', to: '/pages/blog'},
];

export function RecipesSection({articles}: {articles?: BlogArticle[]}) {
  const hasArticles = articles && articles.length > 0;

  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="mx-auto container">
        <h2 className="text-center text-4xl lg:text-7xl uppercase tracking-wide">
          <span className="font-serif font-medium text-secondary">Receitas & </span>
          <span className="font-serif font-medium text-contrast">Inspiração</span>
        </h2>

        <p className="mt-4 text-center text-contrast text-lg md:text-xl">
          Descubra novas formas de aproveitar a YASY
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasArticles
            ? articles.map((article) => (
                <Link
                  to={`/blogs/${article.blog.handle}/${article.handle}`}
                  key={article.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-contrast"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    {article.image ? (
                      <Image
                        data={article.image}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-contrast/20" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-3 p-5">
                    <h3 className="text-sm font-bold leading-snug text-primary md:text-base">
                      {article.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-secondary transition-opacity hover:opacity-70">
                      Ler mais →
                    </p>
                  </div>
                </Link>
              ))
            : FALLBACK_RECIPES.map((recipe) => (
                <Link
                  to={recipe.to}
                  key={recipe.title}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-contrast"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-3 p-5">
                    <h3 className="text-sm font-bold leading-snug text-primary md:text-base">
                      {recipe.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-secondary transition-opacity hover:opacity-70">
                      Ver receita →
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
