import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, useSearchParams} from '@remix-run/react';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {Link} from '~/components/Link';
import {TagButton} from '~/components/TagButton';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const meta = () => [
  {title: 'Blog | YASY'},
  {
    name: 'description',
    content: 'Receitas, dicas e inspiração para o seu dia a dia com YASY.',
  },
];

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const url = new URL(request.url);
  const tagFilter = url.searchParams.get('tag') || null;

  const paginationVariables = getPaginationVariables(request, {pageBy: 10});

  const {articles} = await storefront.query(ARTICLES_QUERY, {
    variables: {
      ...paginationVariables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const allTags = new Set<string>();
  articles?.nodes?.forEach((article: any) => {
    article.tags?.forEach((tag: string) => allTags.add(tag));
  });

  return json({
    articles,
    tagFilter,
    allTags: Array.from(allTags).sort(),
  });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const {articles = {nodes: []} as any, tagFilter, allTags} = useLoaderData<typeof loader>();
  const [, setSearchParams] = useSearchParams();

  function handleTagClick(tag: string | null) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tag) {
        next.set('tag', tag);
      } else {
        next.delete('tag');
      }
      next.delete('cursor');
      next.delete('direction');
      return next;
    });
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-4 lg:px-0 py-12 lg:py-20">
        <nav className="mb-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-contrast/70">
          <Link to="/" className="hover:text-contrast transition-colors">
            Home
          </Link>
          <span className="text-contrast/40">→</span>
          <span className="text-contrast">Blog</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.1]">
          <span className="font-bold text-contrast">Receitas & </span>
          <span className="font-serif text-primary">Inspiração</span>
        </h1>
        <p className="mt-3 text-contrast/80 mb-10">
          Descubra receitas, dicas e novidades do universo YASY.
        </p>

        {allTags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            <TagButton
              active={!tagFilter}
              onClick={() => handleTagClick(null)}
              size="sm"
            >
              Todos
            </TagButton>
            {allTags.map((tag) => (
              <TagButton
                key={tag}
                active={tagFilter === tag}
                onClick={() => handleTagClick(tag)}
                size="sm"
              >
                {tag}
              </TagButton>
            ))}
          </div>
        )}

        <Pagination connection={articles}>
          {({nodes, isLoading, NextLink, PreviousLink}) => {
            const filtered = tagFilter
              ? nodes.filter((article: any) =>
                  article.tags?.includes(tagFilter),
                )
              : nodes;

            return (
              <>
                <PreviousLink className="mb-8 flex justify-center">
                  <span className="rounded-full border-2 border-contrast/60 px-8 py-3 text-xs font-bold uppercase tracking-widest text-contrast transition-colors hover:bg-contrast hover:text-secondary">
                    {isLoading ? 'Carregando...' : '← Artigos anteriores'}
                  </span>
                </PreviousLink>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((article: any) => {
                    const blogHandle = article.blog?.handle || 'news';
                    return (
                      <Link
                        to={`/blogs/${blogHandle}/${article.handle}`}
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
                            <div className="h-full w-full bg-primary/20" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                          {article.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {article.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-contrast"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <h3 className="text-sm font-bold leading-snug text-primary md:text-base">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="text-xs text-primary/70 line-clamp-2">
                              {article.excerpt}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <time
                              dateTime={article.publishedAt}
                              className="text-[10px] uppercase tracking-wider text-primary/50"
                            >
                              {formatDate(article.publishedAt)}
                            </time>
                            <span className="text-xs font-bold uppercase tracking-wider text-secondary transition-opacity group-hover:opacity-70">
                              Ler mais →
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {filtered.length === 0 && (
                  <p className="mt-12 text-center text-contrast/60 text-lg">
                    Nenhum artigo encontrado para essa tag.
                  </p>
                )}

                <NextLink className="mt-10 flex justify-center">
                  <span className="rounded-full border-2 border-contrast/60 px-8 py-3 text-xs font-bold uppercase tracking-widest text-contrast transition-colors hover:bg-contrast hover:text-secondary">
                    {isLoading ? 'Carregando...' : 'Mais artigos →'}
                  </span>
                </NextLink>
              </>
            );
          }}
        </Pagination>
      </div>
    </div>
  );
}

const ARTICLES_QUERY = `#graphql
  query AllArticles(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    articles(
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
      sortKey: PUBLISHED_AT
      reverse: true
    ) {
      nodes {
        id
        title
        handle
        publishedAt
        excerpt
        tags
        blog {
          handle
        }
        image {
          url
          altText
          width
          height
        }
        authorV2 {
          name
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
` as const;
