import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import { Await, Form, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import {
  Pagination,
  getPaginationVariables,
  Analytics,
  getSeoMeta,
} from '@shopify/hydrogen';

import { ProductCard } from '~/components/ProductCard';
import { ProductSwimlane } from '~/components/ProductSwimlane';
import { PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { getImageLoadingPriority, PAGINATION_SIZE } from '~/lib/const';
import { seoPayload } from '~/lib/seo.server';

import {
  getFeaturedData,
  type FeaturedData,
} from './($locale).featured-products';
import { IconSearch } from '~/components/Icon';

export async function loader({
  request,
  context: { storefront },
}: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const searchTerm = searchParams.get('q')!;
  const variables = getPaginationVariables(request, { pageBy: 8 });

  const { products } = await storefront.query(SEARCH_QUERY, {
    variables: {
      searchTerm,
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const shouldGetRecommendations = !searchTerm || products?.nodes?.length === 0;

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'search',
      title: 'Busca',
      handle: 'search',
      descriptionHtml: 'Resultados da busca',
      description: 'Resultados da busca',
      seo: {
        title: 'Busca | YASY',
        description: `Mostrando ${products.nodes.length} resultados para "${searchTerm}"`,
      },
      metafields: [],
      products,
      updatedAt: new Date().toISOString(),
    },
  });

  return defer({
    seo,
    searchTerm,
    products,
    noResultRecommendations: shouldGetRecommendations
      ? getNoResultRecommendations(storefront)
      : Promise.resolve(null),
  });
}

export const meta = ({ matches }: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Search() {
  const { searchTerm, products, noResultRecommendations } =
    useLoaderData<typeof loader>();
  const noResults = products?.nodes?.length === 0;
  const totalCount = products?.nodes?.length ?? 0;
  const hasResults = searchTerm && !noResults;

  return (
    <div className="bg-secondary min-h-screen">
      {/* ── Hero / Search bar ── */}
      <div className="bg-primary py-14 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-sans-2 uppercase text-contrast text-5xl lg:text-7xl mb-8">
            Buscar
          </h1>
          <Form method="get">
            <div className="flex items-center gap-3 bg-contrast rounded-full px-5 py-3 shadow-lg">
              <IconSearch className="w-5 h-5 shrink-0 text-primary/50" />
              <input
                type="search"
                id="search"
                name="q"
                defaultValue={searchTerm}
                placeholder="O que você procura?"
                autoComplete="off"
                className="flex-1 bg-transparent text-base text-primary placeholder:text-primary/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-primary px-5 py-1.5 font-sans-2 text-sm uppercase font-bold text-contrast transition-opacity hover:opacity-80"
              >
                Buscar
              </button>
            </div>
          </Form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* ── Result meta ── */}
        {searchTerm && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-contrast/20 pb-4">
            <div>
              <p className="text-contrast/60 text-sm uppercase tracking-wider mb-0.5">
                Resultados da busca
              </p>
              <h2 className="font-sans-2 text-2xl uppercase text-contrast">
                "{searchTerm}"
              </h2>
            </div>
            {hasResults && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-contrast">
                <span className="text-lg font-sans-2">{totalCount}</span>
                {totalCount === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </span>
            )}
          </div>
        )}

        {/* ── Results grid or empty state ── */}
        {!searchTerm ? (
          <EmptySearch />
        ) : noResults ? (
          <NoResults
            searchTerm={searchTerm}
            recommendations={noResultRecommendations}
          />
        ) : (
          <Pagination connection={products}>
            {({ nodes, isLoading, NextLink, PreviousLink, hasPreviousPage, hasNextPage }) => (
              <>
                {hasPreviousPage && (
                  <div className="flex justify-center mb-8">
                    <PreviousLink className="rounded-full border border-contrast/30 px-8 py-2.5 text-sm font-bold uppercase tracking-wider text-contrast transition hover:bg-contrast hover:text-secondary">
                      {isLoading ? 'Carregando...' : '↑ Ver anteriores'}
                    </PreviousLink>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {nodes.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      loading={getImageLoadingPriority(i)}
                    />
                  ))}
                </div>

                {hasNextPage && (
                  <div className="flex justify-center mt-10">
                    <NextLink className="rounded-full bg-primary px-10 py-3 font-sans-2 text-lg font-bold uppercase text-contrast transition-opacity hover:opacity-90">
                      {isLoading ? 'Carregando...' : 'Ver mais'}
                    </NextLink>
                  </div>
                )}
              </>
            )}
          </Pagination>
        )}
      </div>

      <Analytics.SearchView data={{ searchTerm, searchResults: products }} />
    </div>
  );
}

function EmptySearch() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <svg className="w-16 h-16 text-contrast/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803a7.5 7.5 0 0 0 10.607 0Z" />
      </svg>
      <p className="text-contrast/50 text-lg">Digite algo para buscar produtos.</p>
    </div>
  );
}

function NoResults({
  searchTerm,
  recommendations,
}: {
  searchTerm: string;
  recommendations: Promise<null | FeaturedData>;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <svg className="w-16 h-16 text-contrast/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
        <div>
          <p className="text-contrast font-bold text-xl">Nenhum resultado para "{searchTerm}"</p>
          <p className="text-contrast/50 text-sm mt-1">Tente palavras diferentes ou mais genéricas.</p>
        </div>
      </div>

      <Suspense>
        <Await
          errorElement={null}
          resolve={recommendations}
        >
          {(result) => {
            if (!result) return null;
            const { featuredProducts } = result;
            return (
              <div className="mt-4">
                <div className="h-px bg-contrast/20 mb-10" />
                <ProductSwimlane title="Produtos em Destaque" products={featuredProducts} />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export function getNoResultRecommendations(
  storefront: LoaderFunctionArgs['context']['storefront'],
) {
  return getFeaturedData(storefront, { pageBy: PAGINATION_SIZE });
}

const SEARCH_QUERY = `#graphql
  query PaginatedProductsSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $searchTerm: String
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: RELEVANCE,
      query: $searchTerm
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }

  ${PRODUCT_CARD_FRAGMENT}
` as const;
