import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

import { usePrefixPathWithLocale } from '~/lib/utils';
import type { FeaturedData } from '~/routes/($locale).featured-products';

import { FeaturedCollections } from './FeaturedCollections';
import { ProductSwimlane } from './ProductSwimlane';

export function FeaturedSection() {
  const { load, data } = useFetcher<FeaturedData>();
  const path = usePrefixPathWithLocale('/featured-products');

  useEffect(() => {
    load(path);
  }, [load, path]);

  if (!data) return null;

  const { featuredProducts } = data;

  return (
    <div className="bg-secondary py-12 lg:py-20">
      <ProductSwimlane products={featuredProducts} />
    </div>
  );
}
