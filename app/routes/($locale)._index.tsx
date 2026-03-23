import {json, type MetaArgs, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {HeroSection} from '~/components/HeroSection';
import {MeetTheProduct} from '~/components/MeetTheProduct';
import {ProductShowcase} from '~/components/ProductShowcase';
import {StoryTeaser} from '~/components/StoryTeaser';
import {BenefitsGrid} from '~/components/BenefitsGrid';
import {RecipesSection} from '~/components/RecipesSection';
import {TestimonialsSection} from '~/components/TestimonialsSection';
import {FoundersSection} from '~/components/FoundersSection';
import {RegisterSection} from '~/components/RegisterSection';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {storefront} = context;
  const {language, country} = storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }

  const [{products}, {articles}] = await Promise.all([
    storefront.query(HOMEPAGE_PRODUCTS_QUERY, {
      variables: {country, language},
    }),
    storefront.query(BLOG_ARTICLES_QUERY, {
      variables: {country, language},
    }),
  ]);

  return json({
    products: products.nodes,
    articles: articles.nodes,
    seo: seoPayload.home({url: args.request.url}),
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const {products, articles} = useLoaderData<typeof loader>();

  return (
    <>
      <HeroSection />
      <MeetTheProduct />
      <ProductShowcase products={products} />
      <StoryTeaser />
      <BenefitsGrid />
      <FoundersSection />
      <RecipesSection articles={articles} />
      <TestimonialsSection />
      <RegisterSection />
    </>
  );
}

const HOMEPAGE_PRODUCTS_QUERY = `#graphql
  query HomepageProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 12, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

const BLOG_ARTICLES_QUERY = `#graphql
  query BlogArticles(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    articles(first: 6, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        publishedAt
        excerpt
        blog {
          handle
        }
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
` as const;
