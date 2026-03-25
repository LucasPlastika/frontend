import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import { Link } from '~/components/Link';
import { routeHeaders } from '~/data/cache';
import { TagButton } from '~/components/TagButton';

export const headers = routeHeaders;

export const meta = ({ data }: { data: any }) => {
  if (!data?.article) return [{ title: 'Artigo não encontrado | YASY' }];
  const a = data.article;
  return [
    { title: a.seo?.title || `${a.title} | YASY` },
    { name: 'description', content: a.seo?.description || a.excerpt || '' },
  ];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { blogHandle, articleHandle } = params;
  if (!blogHandle || !articleHandle)
    throw new Response('Not found', { status: 404 });

  const { storefront } = context;

  const { blog } = await storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle,
      articleHandle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const article = blog?.articleByHandle;
  if (!article) throw new Response('Artigo não encontrado', { status: 404 });

  return json({ article, blogHandle });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticlePage() {
  const { article, blogHandle } = useLoaderData<typeof loader>();

  const image = article.image ?? null;
  const author = article.authorV2;
  const tags: string[] = article.tags ?? [];


  return (
    <div className="bg-secondary min-h-screen">
      {/* Hero banner */}
      <div className="relative overflow-hidden">
        <div className="relative min-h-[360px] overflow-hidden" style={{ height: "75vh" }}>
          {image ? (
            <Image
              data={image}
              className="absolute bottom-curve inset-0 h-full w-full object-cover object-center"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-primary" />
          )}
          <div className="absolute [clip-path:ellipse(120%_100%_at_top)] inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-start">
            <div className="container mx-auto px-4 lg:px-0 py-6">
              <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-contrast/70">
                <Link to="/" className="font-sans-2 text-2xl hover:text-contrast transition-colors">
                  Home
                </Link>
                <span className="font-sans-2 text-2xl text-contrast">→</span>
                <Link
                  to={`/blogs/${blogHandle}`}
                  className="font-sans-2 text-2xl hover:text-contrast transition-colors"
                >
                  Blog
                </Link>
                <span className="font-sans-2 text-2xl text-contrast">→</span>
                <span className="font-sans-2 text-2xl text-contrast truncate max-w-[200px]">
                  {article.title}
                </span>
              </nav>
            </div>
          </div>
          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="container mx-auto px-4 lg:px-0 pb-16 lg:pb-20">
              {tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <TagButton
                      key={tag}
                      size="sm"
                      active={true}
                    >
                      {tag}
                    </TagButton>
                  ))}
                </div>
              )}
              <h1 className="font-sans-2 text-6xl uppercase lg:text-8xl text-contrast drop-shadow-lg">
                {article.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-contrast">
                {author?.name && (
                  <>
                    <span className="font-sans-2 text-2xl text-contrast">{author.name}</span>
                    <span className="text-white">·</span>
                  </>
                )}
                <time className="font-sans-2 text-2xl text-contrast" dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-0 py-20 lg:py-28">
        <article
          className="prose prose-lg max-w-none !text-contrast
          prose-headings:font-sans-2
          prose-headings:uppercase
          prose-headings:text-primary
          prose-headings:mb-4
          prose-headings:mt-0
          prose-h1:text-6xl
          prose-h2:text-5xl
          prose-h3:text-4xl
          prose-h4:text-3xl
          prose-h5:text-2xl
          prose-h6:text-xl

          prose-a:underline
          prose-blockquote:border-l-primary prose-blockquote:not-italic prose-blockquote:pl-4
          prose-li:marker:text-primary
          prose-img:rounded-2xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* Back link */}
        <div className="mt-16 border-t border-contrast/20 pt-8">
          <Link
            to={`/blogs/${blogHandle}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-contrast/60 px-8 py-3 text-xs font-bold uppercase tracking-widest text-contrast transition-colors hover:bg-contrast hover:text-secondary"
          >
            ← Voltar ao Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

const ARTICLE_QUERY = `#graphql
  query Article(
    $blogHandle: String!
    $articleHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        handle
        publishedAt
        excerpt
        contentHtml
        tags
        image {
          url
          altText
          width
          height
        }
        authorV2 {
          name
        }
        seo {
          title
          description
        }
      }
    }
  }
` as const;
