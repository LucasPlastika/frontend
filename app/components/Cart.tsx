import clsx from 'clsx';
import { useRef, useState } from 'react';
import useScroll from 'react-use/esm/useScroll';
import {
  flattenConnection,
  CartForm,
  Image,
  Money,
  useOptimisticData,
  OptimisticInput,
  type CartReturn,
} from '@shopify/hydrogen';
import type {
  Cart as CartType,
  CartCost,
  CartLine,
  CartLineUpdateInput,
} from '@shopify/hydrogen/storefront-api-types';

import { useRouteLoaderData } from '@remix-run/react';

import { Link } from '~/components/Link';
import { IconRemove } from '~/components/Icon';
import type { RootLoader } from '~/root';

type Layouts = 'page' | 'drawer';

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export function Cart({
  layout,
  onClose,
  cart,
}: {
  layout: Layouts;
  onClose?: () => void;
  cart: CartReturn | null;
}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);

  return (
    <>
      {!linesCount && <CartEmpty hidden={false} onClose={onClose} layout={layout} />}
      {linesCount && <CartDetails cart={cart} layout={layout} />}
    </>
  );
}

// ---------------------------------------------------------------------------
// CartDetails
// ---------------------------------------------------------------------------

export function CartDetails({
  layout,
  cart,
}: {
  layout: Layouts;
  cart: CartType | null;
}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  if (layout === 'drawer') {
    return (
      <div className="grid grid-cols-1 h-screen-no-nav bg-secondary grid-rows-[1fr_auto]">
        <CartLines lines={cart?.lines} layout="drawer" />
        {cartHasItems && (
          <CartSummary cost={cart.cost} layout="drawer">
            <CartDiscounts discountCodes={cart.discountCodes} layout="drawer" />
            <CartCheckoutActions checkoutUrl={cart.checkoutUrl} layout="drawer" />
          </CartSummary>
        )}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1fr_360px] lg:grid-cols-[1fr_400px] gap-6 lg:gap-10 items-start">
      <CartLines lines={cart?.lines} layout="page" />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout="page">
          <CartDiscounts discountCodes={cart.discountCodes} layout="page" />
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} layout="page" />
        </CartSummary>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CartLines
// ---------------------------------------------------------------------------

function CartLines({
  layout = 'drawer',
  lines: cartLines,
}: {
  layout: Layouts;
  lines: CartType['lines'] | undefined;
}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  if (layout === 'drawer') {
    return (
      <section
        ref={scrollRef}
        aria-labelledby="cart-contents"
        className={clsx(
          'overflow-auto px-4 pb-6 pt-2 sm:px-6 transition',
          y > 0 && 'border-t border-primary/10',
        )}
      >
        <ul className="grid gap-4">
          {currentLines.map((line) => (
            <CartLineItem key={line.id} line={line as CartLine} layout="drawer" />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section ref={scrollRef} aria-labelledby="cart-contents">
      <ul className="grid gap-4">
        {currentLines.map((line) => (
          <CartLineItem key={line.id} line={line as CartLine} layout="page" />
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CartLineItem
// ---------------------------------------------------------------------------

type OptimisticData = {
  action?: string;
  quantity?: number;
};

function CartLineItem({
  line,
  layout,
}: {
  line: CartLine;
  layout: Layouts;
}) {
  const optimisticData = useOptimisticData<OptimisticData>(line?.id);

  if (!line?.id) return null;
  const { id, quantity, merchandise } = line;
  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  const isDrawer = layout === 'drawer';

  return (
    <li
      key={id}
      className={clsx(
        'flex gap-4 items-center rounded-2xl',
        isDrawer
          ? 'bg-contrast/10 p-3'
          : 'bg-contrast p-4',
      )}
      style={{ display: optimisticData?.action === 'remove' ? 'none' : 'flex' }}
    >
      {/* Image */}
      {merchandise.image && (
        <div className={clsx('shrink-0 rounded-xl overflow-hidden', isDrawer ? 'w-20 h-20' : 'w-24 h-24 md:w-28 md:h-28')}>
          <Image
            data={merchandise.image}
            className="w-full h-full object-cover"
            alt={merchandise.title}
          />
        </div>
      )}

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            {merchandise?.product?.handle ? (
              <Link
                to={`/products/${merchandise.product.handle}`}
                className={clsx(
                  'font-sans-2 uppercase line-clamp-2',
                  isDrawer ? 'text-2xl text-primary' : 'text-2xl text-primary',
                )}
              >
                {merchandise?.product?.title || ''}
              </Link>
            ) : (
              <span
                className={clsx(
                  'font-sans-2 uppercase',
                  isDrawer ? 'text-2xl text-primary' : 'text-2xl text-primary',
                )}
              >
                {merchandise?.product?.title || ''}
              </span>
            )}
            <CartLinePrice line={line} as="span" />
          </div>
          <ItemRemoveButton lineId={id} isDrawer={isDrawer} />
        </div>

        <div className="mt-2">
          <CartLineQuantityAdjust line={line} isDrawer={isDrawer} />
        </div>
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Quantity Adjust
// ---------------------------------------------------------------------------

function CartLineQuantityAdjust({
  line,
  isDrawer,
}: {
  line: CartLine;
  isDrawer?: boolean;
}) {
  const optimisticId = line?.id;
  const optimisticData = useOptimisticData<OptimisticData>(optimisticId);

  if (!line || typeof line?.quantity === 'undefined') return null;

  const optimisticQuantity = optimisticData?.quantity || line.quantity;
  const { id: lineId } = line;
  const prevQuantity = Number(Math.max(0, optimisticQuantity - 1).toFixed(0));
  const nextQuantity = Number((optimisticQuantity + 1).toFixed(0));

  return (
    <div className="flex items-center w-fit rounded-full border border-primary/20 bg-contrast/20 overflow-hidden">
      <UpdateCartButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          name="decrease-quantity"
          aria-label="Diminuir quantidade"
          className={clsx(
            'flex items-center justify-center font-bold text-primary transition hover:bg-primary/10 disabled:opacity-30',
            isDrawer ? 'w-7 h-7 text-sm' : 'w-8 h-8',
          )}
          value={prevQuantity}
          disabled={optimisticQuantity <= 1}
        >
          &#8722;
          <OptimisticInput id={optimisticId} data={{ quantity: prevQuantity }} />
        </button>
      </UpdateCartButton>

      <span
        className={clsx(
          'px-3 text-center font-bold text-primary select-none',
          isDrawer ? 'text-sm' : 'text-base',
        )}
        data-test="item-quantity"
      >
        {optimisticQuantity}
      </span>

      <UpdateCartButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          className={clsx(
            'flex items-center justify-center font-bold text-primary transition hover:bg-primary/10',
            isDrawer ? 'w-7 h-7 text-sm' : 'w-8 h-8',
          )}
          name="increase-quantity"
          value={nextQuantity}
          aria-label="Aumentar quantidade"
        >
          &#43;
          <OptimisticInput id={optimisticId} data={{ quantity: nextQuantity }} />
        </button>
      </UpdateCartButton>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Remove Button
// ---------------------------------------------------------------------------

function ItemRemoveButton({
  lineId,
  isDrawer,
}: {
  lineId: CartLine['id'];
  isDrawer?: boolean;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds: [lineId] }}
    >
      <button
        type="submit"
        aria-label="Remover item"
        className={clsx(
          'shrink-0 flex items-center justify-center rounded-full transition text-primary hover:bg-primary/10',
          'w-8 h-8',
        )}
      >
        <IconRemove aria-hidden="true" />
      </button>
      <OptimisticInput id={lineId} data={{ action: 'remove' }} />
    </CartForm>
  );
}

// ---------------------------------------------------------------------------
// CartSummary
// ---------------------------------------------------------------------------

function CartSummary({
  cost,
  layout,
  children = null,
}: {
  children?: React.ReactNode;
  cost: CartCost;
  layout: Layouts;
}) {
  return (
    <section
      aria-labelledby="summary-heading"
      className={clsx(
        'bg-primary rounded-2xl grid gap-4',
        layout === 'drawer' ? 'p-4 sm:p-6 mx-4 mb-4 sm:mx-6 sm:mb-6' : 'p-6 sticky top-nav',
      )}
    >
      <h2 id="summary-heading" className="sr-only">
        Resumo do pedido
      </h2>

      <div className="flex items-center justify-between">
        <span className="text-contrast uppercase text-sm">Subtotal</span>
        <span className="text-contrast font-bold text-base">
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost.subtotalAmount} />
          ) : (
            '-'
          )}
        </span>
      </div>

      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// CartDiscounts
// ---------------------------------------------------------------------------

function CartDiscounts({
  discountCodes,
  layout,
}: {
  discountCodes: CartType['discountCodes'];
  layout: Layouts;
}) {
  const [submittedCode, setSubmittedCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];

  const isInvalid =
    !!submittedCode &&
    !!discountCodes?.some(
      (d) =>
        d.code.toUpperCase() === submittedCode.toUpperCase() && !d.applicable,
    );

  return (
    <>
      {/* Applied discounts */}
      {codes.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-contrast uppercase">Desconto(s)</span>
          <div className="flex items-center gap-2">
            <span className="text-contrast font-medium">{codes.join(', ')}</span>
            <UpdateDiscountForm>
              <button
                type="submit"
                aria-label="Remover desconto"
                className="text-contrast/50 hover:text-contrast transition"
              >
                ✕
              </button>
            </UpdateDiscountForm>
          </div>
        </div>
      )}

      {/* Coupon input */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.DiscountCodesUpdate}
        inputs={{ discountCodes: codes }}
      >
        {(fetcher: any) => {
          const isLoading = fetcher.state !== 'idle';

          return (
            <div className="flex flex-col gap-1">
              <div
                className={clsx(
                  'flex items-center gap-2 rounded-full bg-contrast px-4 py-2.5 transition',
                  isLoading && 'opacity-60',
                )}
              >
                <svg
                  className="w-4 h-4 shrink-0 text-secondary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-3.75-3.75 3.75-3.75-3.75-3.75 3.75V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  name="discountCode"
                  placeholder="Cupom de desconto"
                  disabled={isLoading}
                  onChange={() => setSubmittedCode('')}
                  className="flex-1 bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none min-w-0 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={() => setSubmittedCode(inputRef.current?.value || '')}
                  className="shrink-0 flex items-center justify-center text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-primary transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <svg
                      className="w-3.5 h-3.5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    'Aplicar'
                  )}
                </button>
              </div>

              {!isLoading && isInvalid && (
                <p className="text-red-400 text-xs px-4">
                  Cupom inválido ou expirado.
                </p>
              )}
            </div>
          );
        }}
      </CartForm>
    </>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{ discountCodes: discountCodes || [] }}
    >
      {children}
    </CartForm>
  );
}

// ---------------------------------------------------------------------------
// CartCheckoutActions
// ---------------------------------------------------------------------------

function useCheckoutUrl(checkoutUrl: string): string {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!checkoutUrl) return checkoutUrl;

  const publicStoreDomain = (rootData as any)?.publicStoreDomain;
  if (!publicStoreDomain) return checkoutUrl;

  try {
    const url = new URL(checkoutUrl);
    if (!url.hostname.endsWith('.myshopify.com')) {
      url.hostname = publicStoreDomain;
      return url.toString();
    }
  } catch {
    // keep original
  }

  return checkoutUrl;
}

function CartCheckoutActions({
  checkoutUrl,
  layout,
}: {
  checkoutUrl: string;
  layout?: Layouts;
}) {
  if (!checkoutUrl) return null;

  const finalCheckoutUrl = useCheckoutUrl(checkoutUrl);

  return (
    <div className="grid gap-2">
      <a href={finalCheckoutUrl} target="_self" className="block">
        <button className="w-full rounded-full bg-secondary py-3 font-sans-2 text-lg font-bold uppercase tracking-widest text-contrast transition-opacity hover:opacity-90">
          Finalizar Compra
        </button>
      </a>
      {layout === 'drawer' && (
        <Link
          to="/cart"
          className="text-center text-xs text-contrast/50 hover:text-contrast transition underline underline-offset-2"
        >
          Ver carrinho completo
        </Link>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CartLinePrice
// ---------------------------------------------------------------------------

function CartLinePrice({
  line,
  priceType = 'regular',
  ...passthroughProps
}: {
  line: CartLine;
  priceType?: 'regular' | 'compareAt';
  [key: string]: any;
}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) return null;

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} className="font-sans-2 text-xl font-bold" />;
}

// ---------------------------------------------------------------------------
// UpdateCartButton
// ---------------------------------------------------------------------------

function UpdateCartButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}

// ---------------------------------------------------------------------------
// CartEmpty
// ---------------------------------------------------------------------------

export function CartEmpty({
  hidden = false,
  layout = 'drawer',
  onClose,
}: {
  hidden: boolean;
  layout?: Layouts;
  onClose?: () => void;
}) {
  return (
    <div
      hidden={hidden}
      className={clsx(
        layout === 'drawer'
          ? 'flex flex-col items-center justify-center gap-2 p-8 bg-secondary h-screen-no-nav text-center'
          : hidden
            ? 'hidden'
            : 'flex flex-col items-center justify-center gap-6 py-20 text-center',
      )}
    >
      <p className={clsx('text-lg font-medium', layout === 'drawer' ? 'text-primary' : 'text-primary')}>
        Sua sacola está vazia.
      </p>
      <button
        onClick={onClose}
        className="rounded-full bg-primary px-8 py-3 text-contrast transition-opacity hover:opacity-90"
      >
        <Link to="/collections/all" className="font-sans-2 text-xl uppercase text-contrast">Ver Produtos</Link>
      </button>
    </div>
  );
}
