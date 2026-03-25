import { useParams, Form, Await, useRouteLoaderData } from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import { Disclosure } from '@headlessui/react';
import { Suspense, useEffect, useRef, useMemo } from 'react';
import { CartForm } from '@shopify/hydrogen';

import { type LayoutQuery } from 'storefrontapi.generated';
import { Heading } from '~/components/Text';
import { Link } from '~/components/Link';
import { Cart } from '~/components/Cart';
import { CartLoading } from '~/components/CartLoading';
import { Drawer, useDrawer } from '~/components/Drawer';
import { IconMenu, IconCaret, IconBag, IconSearch } from '~/components/Icon';
import { type EnhancedMenu } from '~/lib/utils';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import type { RootLoader } from '~/root';
import clsx from 'clsx';
import FloatingStar from '~/components/FloatingStar';

const NAV_LINKS = [
  { to: '/collections/all', label: 'Loja' },
  { to: '/pages/about', label: 'Nossa História' },
  { to: '/pages/faq', label: 'Dúvidas' },
  { to: '/pages/blog', label: 'Blog' },
] as const;

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({ children, layout }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <a href="#mainContent" className="sr-only">
            Ir para o conteúdo
          </a>
        </div>
        <Header />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function Header() {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);
  const prevFetchersCount = useRef(0);

  useEffect(() => {
    const currentCount = addToCartFetchers.length;
    if (!isCartOpen && prevFetchersCount.current > 0 && currentCount === 0) {
      openCart();
    }
    prevFetchersCount.current = currentCount;
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MobileMenuDrawer isOpen={isMenuOpen} onClose={closeMenu} />
      <TopBar />
      <div className="sticky top-0 z-40">
        <DesktopHeader openCart={openCart} />
        <MobileHeader openCart={openCart} openMenu={openMenu} />
      </div>
    </>
  );
}

function TopBar() {
  return (
    <div className="py-1.5 bg-[#FAB645] text-black md:text-lg text-center">
      <strong className="uppercase">Frete grátis</strong> a partir de R$ 99
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart Drawer (unchanged logic)
// ---------------------------------------------------------------------------

function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      heading="Sacola"
      headingClassName="font-sans-2 text-2xl font-bold uppercase tracking-wider text-primary"
      openFrom="right"
      className="bg-secondary"
    >
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

// ---------------------------------------------------------------------------
// Mobile Menu Drawer
// ---------------------------------------------------------------------------

export function MobileMenuDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const params = useParams();

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      openFrom="left"
      className="bg-primary text-contrast"
      panelClassName="w-[80vw]"
    >
      <div className="grid">
        <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }: { isActive: boolean }) =>
                `pb-1 text-xl font-medium text-contrast transition-opacity hover:opacity-70 ${isActive ? 'border-b-2 border-secondary -mb-px' : ''}`
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 sm:px-12">
          <Form
            method="get"
            action={params.locale ? `/${params.locale}/search` : '/search'}
            onSubmit={onClose}
            className="flex items-center gap-2 border-b border-contrast/20 pb-2"
          >
            <IconSearch className="w-5 h-5 text-contrast/50" />
            <input
              type="search"
              name="q"
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-contrast placeholder:text-contrast/40 focus:outline-none"
            />
          </Form>
        </div>
      </div>
    </Drawer>
  );
}

// ---------------------------------------------------------------------------
// Desktop Header
// ---------------------------------------------------------------------------

function DesktopHeader({ openCart }: { openCart: () => void }) {
  const params = useParams();
  const { y } = useWindowScroll();

  return (
    <header
      role="banner"
      className={clsx(`bg-primary transition duration-300`, y > 50 ? 'shadow-lg' : '')}
    >
      <div className="hidden lg:flex container mx-auto items-center h-nav">
        <div className="flex items-center gap-10">
          <Link to="/" prefetch="intent" className="shrink-0">
            <img src="/logo.svg" alt="Yasy" className="h-6 w-auto" />
          </Link>
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                prefetch="intent"
                className={({ isActive }: { isActive: boolean }) =>
                  `text-[20px] font-medium leading-normal tracking-[0] text-[#F5DEDA] transition-colors pb-1 ${isActive
                    ? 'border-b-2 border-secondary'
                    : 'hover:opacity-80'
                  }`
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Form
            method="get"
            action={params.locale ? `/${params.locale}/search` : '/search'}
            className="flex items-center"
          >
            <div className="flex items-center bg-[#f5f0f0] rounded-full px-4 py-2 w-72 shadow-inner">
              <input
                type="search"
                name="q"
                placeholder="Buscar"
                className="flex-1 "
              />
              <button className="ml-2 flex items-center justify-center">
                <IconSearch className="w-5 h-5 text-secondary" />
              </button>
            </div>
          </Form>
          <CartCount openCart={openCart} dark />
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Mobile Header
// ---------------------------------------------------------------------------

function MobileHeader({
  openCart,
  openMenu,
}: {
  openCart: () => void;
  openMenu: () => void;
}) {
  return (
    <header
      role="banner"
      className="flex lg:hidden items-center h-nav px-4 md:px-8 bg-primary text-contrast"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={openMenu}
          className="flex items-center justify-center w-8 h-8 text-contrast/80 hover:text-contrast transition-colors"
        >
          <IconMenu />
        </button>
      </div>

      <Link
        className="flex-1 text-center"
        to="/"
      >
        <img src="/logo.svg" alt="Yasy" className="h-5 w-auto mx-auto" />
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to="/search"
          className="flex items-center justify-center w-8 h-8 text-contrast/80 hover:text-contrast transition-colors"
        >
          <IconSearch />
        </Link>
        <CartCount openCart={openCart} dark />
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Cart Badge
// ---------------------------------------------------------------------------

function CartCount({ openCart, dark }: { openCart: () => void; dark?: boolean }) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} openCart={openCart} dark={dark} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            openCart={openCart}
            count={cart?.totalQuantity || 0}
            dark={dark}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  count,
  dark,
}: {
  count: number;
  openCart: () => void;
  dark?: boolean;
}) {
  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag className='w-7 h-7' />
        <div
          className={`absolute bottom-1 right-1 flex items-center justify-center h-3 min-w-[0.75rem] px-[0.125rem] pb-px rounded-full text-[0.625rem] font-medium leading-none subpixel-antialiased ${dark ? 'bg-secondary text-white' : 'bg-black text-white'
            }`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return (
    <button
      onClick={openCart}
      className={`relative flex items-center justify-center w-8 h-8 transition-colors ${dark
        ? 'text-secondary hover:text-secondary/80'
        : 'text-gray-700 hover:text-black'
        }`}
    >
      {BadgeCounter}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const FOOTER_SHOP_LINKS = [
  { to: '/collections/all', label: 'Todos os produtos' },
  { to: '/collections/new', label: 'Novidades' },
] as const;

const FOOTER_STORY_LINKS = [
  { to: '/pages/about', label: 'Sobre nós' },
  { to: '/pages/founders', label: 'Nossos fundadores' },
  { to: '/pages/blog', label: 'Receitas & blog' },
] as const;

const FOOTER_LEGAL_LINKS = [
  { to: '/policies/privacy-policy', label: 'Política de privacidade' },
  { to: '/policies/terms-of-service', label: 'Termos de uso' },
  { to: '/policies/shipping-policy', label: 'Envio & devoluções' },
  { to: '/pages/faq', label: 'Dúvidas frequentes' },
  { to: '/pages/contact', label: 'Fale conosco' },
] as const;

const FOOTER_CONNECT_LINKS = [
  { to: '#newsletter', label: 'Newsletter' },
  { to: '/pages/contact', label: 'Contato' },
  { to: '#', label: 'Instagram' },
  { to: '#', label: 'TikTok' },
  { to: '#', label: 'Facebook' },
] as const;

type FooterSection = {
  title: string;
  links: ReadonlyArray<{ to: string; label: string }>;
};

const FOOTER_SECTIONS: FooterSection[] = [
  { title: 'Loja', links: FOOTER_SHOP_LINKS },
  { title: 'Nossa História', links: FOOTER_STORY_LINKS },
  { title: 'Legal', links: FOOTER_LEGAL_LINKS },
  { title: 'Conecte-se', links: FOOTER_CONNECT_LINKS },
];

function SocialIcons() {
  const iconClass = 'w-6 h-6 text-secondary hover:text-secondary/70 transition-colors';
  return (
    <div className="flex items-center gap-3">
      <a href="#" aria-label="Facebook" className={iconClass}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
      </a>
      <a href="#" aria-label="Instagram" className={iconClass}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
      </a>
      <a href="#" aria-label="TikTok" className={iconClass}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" /></svg>
      </a>
      <a href="#" aria-label="LinkedIn" className={iconClass}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
      </a>
      <a href="#" aria-label="X" className={iconClass}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a href="#" aria-label="WhatsApp" className={iconClass}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B1215] overflow-hidden">
      <div className="relative text-gray-300 container mx-auto">
        <FloatingStar
          size={200}
          responsiveSize={120}
          fill="rgba(255,255,255,0.04)"
          className="absolute -right-10 -top-10 lg:right-12 lg:top-8"
        />

        {/* Desktop footer */}
        <div className="relative z-10 hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8 py-14">
          <FooterBrand />
          {FOOTER_SECTIONS.map((section) => (
            <FooterLinkColumn key={section.title} title={section.title} links={section.links} />
          ))}
        </div>

        {/* Mobile footer */}
        <div className="relative z-10 md:hidden px-6 py-8 space-y-2">
          <FooterBrand />
          <div className="pt-4">
            {FOOTER_SECTIONS.map((section) => (
              <FooterAccordion key={section.title} title={section.title} links={section.links} />
            ))}
          </div>
        </div>

        <div className="relative z-10 px-6 md:px-8 lg:px-12 py-6 border-t border-white/10 text-center text-xs text-gray-500">
          &copy; 2026 YASY. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function FooterBrand() {
  return (
    <div className="space-y-4">
      <Link to="/" className="inline-block">
        <img src="/logo.svg" alt="Yasy" className="h-6 w-auto brightness-0 invert" />
      </Link>
      <p className=" leading-relaxed text-gray-200 max-w-[220px]">
        Pipoca Gourmet Zero Açúcar. Prazer sem culpa, do jeito YASY.
      </p>
      <SocialIcons />
    </div>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ to: string; label: string }>;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-sans-2 text-3xl text-white uppercase">
        {title}
      </h3>
      <nav className="flex flex-col gap-2.5">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-gray-200 text-lg hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function FooterConnectColumn() {
  const internalPaths = ['/pages/contact'];

  return (
    <div className="space-y-4">
      <h3 className="font-sans-2 text-3xl text-white uppercase">
        Conecte-se
      </h3>
      <nav className="flex flex-col gap-2.5">
        {FOOTER_CONNECT_LINKS.map((link) =>
          internalPaths.includes(link.href) ? (
            <Link
              key={link.label}
              to={link.href}
              className=" text-gray-200 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className=" text-gray-200 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ),
        )}
      </nav>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer Accordions (Mobile)
// ---------------------------------------------------------------------------

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ to: string; label: string }>;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="border-b border-white/10">
          <Disclosure.Button className="flex items-center justify-between w-full py-4  font-semibold text-white">
            {title}
            <IconCaret direction={open ? 'up' : 'down'} className="w-4 h-4" />
          </Disclosure.Button>
          <div
            className={`${open ? 'max-h-64 pb-4' : 'max-h-0'
              } overflow-hidden transition-all duration-300`}
          >
            <Suspense>
              <Disclosure.Panel static>
                <nav className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </Disclosure.Panel>
            </Suspense>
          </div>
        </div>
      )}
    </Disclosure>
  );
}

function FooterAccordionConnect() {
  const internalPaths = ['/pages/contact'];

  return (
    <Disclosure>
      {({ open }) => (
        <div className="border-b border-white/10">
          <Disclosure.Button classFPipoca Gourmet Zero AçúcarName="flex items-center justify-between w-full py-4  font-semibold text-white">
            Conecte-se
            <IconCaret direction={open ? 'up' : 'down'} className="w-4 h-4" />
          </Disclosure.Button>
          <div
            className={`${open ? 'max-h-64 pb-4' : 'max-h-0'
              } overflow-hidden transition-all duration-300`}
          >
            <Suspense>
              <Disclosure.Panel static>
                <nav className="flex flex-col gap-2">
                  {FOOTER_CONNECT_LINKS.map((link) =>
                    internalPaths.includes(link.href) ? (
                      <Link
                        key={link.label}
                        to={link.href}
                        className=" text-gray-200 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className=" text-gray-200 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ),
                  )}
                </nav>
              </Disclosure.Panel>
            </Suspense>
          </div>
        </div>
      )}
    </Disclosure>
  );
}

