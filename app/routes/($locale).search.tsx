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

import { Heading, PageHeader, Section, Text } from '~/components/Text';
import { Input } from '~/components/Input';
import { Grid } from '~/components/Grid';
import { ProductCard } from '~/components/ProductCard';
import { ProductSwimlane } from '~/components/ProductSwimlane';
import { FeaturedCollections } from '~/components/FeaturedCollections';
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

  return (
    <section className="bg-secondary py-12 min-h-screen">
      <div className="container mx-auto">
        <Form
          method="get"
          className="px-12"
        >
          <label htmlFor="search" className="text-contrast text-xl">Buscar</label>
          <div className="flex w-fit gap-4 items-center bg-[#f5f0f0] rounded-full px-4 py-2 w-128 shadow-inner">
            <input
              type="search"
              name="q"
              defaultValue={searchTerm}
              placeholder="Buscar"
              className="flex-1 text-lg"
            />
            <button className="ml-2 flex items-center justify-center">
              <IconSearch className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </Form>
        {!searchTerm || noResults ? (
          <NoResults
            noResults={noResults}
            recommendations={noResultRecommendations}
          />
        ) : (
          <Section>
            <Pagination connection={products}>
              {({ nodes, isLoading, NextLink, PreviousLink }) => {
                const itemsMarkup = nodes.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    loading={getImageLoadingPriority(i)}
                  />
                ));

                return (
                  <>
                    <div className="flex items-center justify-center mt-6">
                      <PreviousLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                        {isLoading ? 'Carregando...' : 'Anterior'}
                      </PreviousLink>
                    </div>
                    <Grid data-test="product-grid">{itemsMarkup}</Grid>
                    <div className="flex items-center justify-center mt-6">
                      <NextLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                        {isLoading ? 'Carregando...' : 'Próxima'}
                      </NextLink>
                    </div>
                  </>
                );
              }}
            </Pagination>
          </Section>
        )}
        <Analytics.SearchView data={{ searchTerm, searchResults: products }} />
      </div>
    </section>
  );
}

function NoResults({
  noResults,
  recommendations,
}: {
  noResults: boolean;
  recommendations: Promise<null | FeaturedData>;
}) {
  return (
    <>
      {noResults && (
        <Section padding="x">
          <Text className="text-contrast">
            Nenhum resultado encontrado. Tente uma busca diferente.
          </Text>
        </Section>
      )}
      <Suspense>
        <Await
          errorElement="Houve um problema ao carregar produtos relacionados"
          resolve={recommendations}
        >
          {(result) => {
            if (!result) return null;
            const { featuredCollections, featuredProducts } = result;

            return (
              <>
                <div className='h-px mt-10 container mx-auto w-full bg-contrast/50' />
                <ProductSwimlane
                  title="Produtos em Destaque"
                  products={featuredProducts}
                />
              </>
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
