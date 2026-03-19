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
import {FoundersSection} from '~/components/FoundersSection';
import {NewsletterSection} from '~/components/NewsletterSection';

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

  const {products} = await storefront.query(HOMEPAGE_PRODUCTS_QUERY, {
    variables: {
      country,
      language,
    },
  });

  return json({
    products: products.nodes,
    seo: seoPayload.home({url: args.request.url}),
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <>
      <HeroSection />
      <MeetTheProduct />
      <ProductShowcase products={products} />
      <StoryTeaser />
      <BenefitsGrid />
      <FoundersSection />
      <NewsletterSection />
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
