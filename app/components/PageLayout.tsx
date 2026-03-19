import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {CartForm} from '@shopify/hydrogen';

import {type LayoutQuery} from 'storefrontapi.generated';
import {Heading} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Drawer, useDrawer} from '~/components/Drawer';
import {IconMenu, IconCaret, IconBag, IconSearch} from '~/components/Icon';
import {type EnhancedMenu} from '~/lib/utils';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

const NAV_LINKS = [
  {to: '/collections/all', label: 'Loja'},
  {to: '/pages/about', label: 'Nossa História'},
  {to: '/pages/faq', label: 'Dúvidas'},
  {to: '/pages/blog', label: 'Blog'},
] as const;

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
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

  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MobileMenuDrawer isOpen={isMenuOpen} onClose={closeMenu} />
      <TopBar />
      <DesktopHeader openCart={openCart} />
      <MobileHeader openCart={openCart} openMenu={openMenu} />
    </>
  );
}

function TopBar() {
  return (
    <div className="py-1.5 bg-black text-white text-xs text-center">
      VISTO NA GLOBO! PIPOCA YASY ZERO AÇÚCAR CHEGA AO BRASIL 🍿
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart Drawer (unchanged logic)
// ---------------------------------------------------------------------------

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Carrinho" openFrom="right">
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
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({isActive}: {isActive: boolean}) =>
                `pb-1 text-lg font-medium text-black ${isActive ? 'border-b border-black -mb-px' : ''}`
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
            className="flex items-center gap-2 border-b border-gray-200 pb-2"
          >
            <IconSearch className="w-5 h-5 text-gray-500" />
            <input
              type="search"
              name="q"
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-sm text-black placeholder:text-gray-400 focus:outline-none"
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

function DesktopHeader({openCart}: {openCart: () => void}) {
  const params = useParams();
  const {y} = useWindowScroll();

  return (
    <header
      role="banner"
      className={`hidden lg:flex items-center sticky top-0 z-40 h-nav px-12 py-8 bg-white text-black transition duration-300 ${
        y > 50 ? 'shadow-sm' : ''
      }`}
    >
      <div className="flex items-center gap-12">
        <Link className="text-xl font-bold uppercase tracking-widest text-black" to="/" prefetch="intent">
          Yasy
        </Link>
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              prefetch="intent"
              className={({isActive}: {isActive: boolean}) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-black border-b border-black -mb-px pb-1'
                    : 'text-gray-600 hover:text-black pb-1'
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
          className="flex items-center gap-2"
        >
          <input
            type="search"
            name="q"
            placeholder="Buscar"
            className="hidden lg:inline-block w-40 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 border-b border-transparent focus:border-gray-300 focus:outline-none transition pb-1"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-black transition-colors"
          >
            <IconSearch />
          </button>
        </Form>
        <CartCount openCart={openCart} />
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
      className="flex lg:hidden items-center sticky top-0 z-40 h-nav px-4 md:px-8 bg-white text-black shadow-sm"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={openMenu}
          className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-black transition-colors"
        >
          <IconMenu />
        </button>
      </div>

      <Link
        className="flex-1 text-center text-lg font-bold uppercase tracking-widest text-black"
        to="/"
      >
        Yasy
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to="/search"
          className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-black transition-colors"
        >
          <IconSearch />
        </Link>
        <CartCount openCart={openCart} />
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Cart Badge
// ---------------------------------------------------------------------------

function CartCount({openCart}: {openCart: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => <Badge openCart={openCart} count={cart?.totalQuantity || 0} />}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, count}: {count: number; openCart: () => void}) {
  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div className="absolute bottom-1 right-1 flex items-center justify-center h-3 min-w-[0.75rem] px-[0.125rem] pb-px rounded-full bg-black text-white text-[0.625rem] font-medium leading-none subpixel-antialiased">
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count],
  );

  return (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 text-gray-700 hover:text-black transition-colors"
    >
      {BadgeCounter}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const FOOTER_SHOP_LINKS = [
  {to: '/collections/all', label: 'Todos os Produtos'},
  {to: '/collections/new', label: 'Novidades'},
] as const;

const FOOTER_STORY_LINKS = [
  {to: '/pages/about', label: 'Sobre Nós'},
  {to: '/pages/founders', label: 'Nossos Fundadores'},
  {to: '/pages/blog', label: 'Receitas & Blog'},
] as const;

const FOOTER_CONNECT_LINKS = [
  {label: 'Instagram', href: '#'},
  {label: 'TikTok', href: '#'},
  {label: 'Facebook', href: '#'},
  {label: 'Newsletter', href: '#newsletter'},
  {label: 'Contato', href: '/pages/contact'},
] as const;

const FOOTER_LEGAL_LINKS = [
  {to: '/policies/privacy-policy', label: 'Política de Privacidade'},
  {to: '/policies/terms-of-service', label: 'Termos de Uso'},
  {to: '/policies/shipping-policy', label: 'Envio & Devoluções'},
  {to: '/pages/faq', label: 'Dúvidas Frequentes'},
  {to: '/pages/contact', label: 'Fale Conosco'},
] as const;

type FooterSection = {
  title: string;
  links: ReadonlyArray<{to: string; label: string}>;
};

const FOOTER_SECTIONS: FooterSection[] = [
  {title: 'Loja', links: FOOTER_SHOP_LINKS},
  {title: 'Nossa História', links: FOOTER_STORY_LINKS},
  {title: 'Legal', links: FOOTER_LEGAL_LINKS},
];

function Footer() {
  return (
    <footer role="contentinfo" className="bg-black text-gray-300">
      {/* Desktop footer */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8 px-6 md:px-8 lg:px-12 py-12">
        <FooterBrand />
        {FOOTER_SECTIONS.map((section) => (
          <FooterLinkColumn key={section.title} title={section.title} links={section.links} />
        ))}
        <FooterConnectColumn />
      </div>

      {/* Mobile footer */}
      <div className="md:hidden px-6 py-8 space-y-2">
        <FooterBrand />
        <div className="pt-4">
          {FOOTER_SECTIONS.map((section) => (
            <FooterAccordion key={section.title} title={section.title} links={section.links} />
          ))}
          <FooterAccordionConnect />
        </div>
      </div>

      <div className="px-6 md:px-8 lg:px-12 py-6 border-t border-gray-800 text-center text-xs text-gray-400">
        &copy; 2026 YASY. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function FooterBrand() {
  return (
    <div className="space-y-3">
      <Link to="/" className="text-xl font-bold uppercase tracking-widest text-white">
        Yasy
      </Link>
      <p className="text-sm leading-relaxed text-gray-400">
        Pipoca Gourmet Zero Açúcar. Prazer sem culpa, do jeito YASY.
      </p>
    </div>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{to: string; label: string}>;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h3>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-gray-400 hover:text-white transition-colors"
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
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
        Conecte-se
      </h3>
      <nav className="flex flex-col gap-2">
        {FOOTER_CONNECT_LINKS.map((link) =>
          internalPaths.includes(link.href) ? (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sm text-gray-400 hover:text-white transition-colors"
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
  links: ReadonlyArray<{to: string; label: string}>;
}) {
  return (
    <Disclosure>
      {({open}) => (
        <div className="border-b border-gray-800">
          <Disclosure.Button className="flex items-center justify-between w-full py-4 text-sm font-semibold text-white">
            {title}
            <IconCaret direction={open ? 'up' : 'down'} className="w-4 h-4" />
          </Disclosure.Button>
          <div
            className={`${
              open ? 'max-h-64 pb-4' : 'max-h-0'
            } overflow-hidden transition-all duration-300`}
          >
            <Suspense>
              <Disclosure.Panel static>
                <nav className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
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
      {({open}) => (
        <div className="border-b border-gray-800">
          <Disclosure.Button className="flex items-center justify-between w-full py-4 text-sm font-semibold text-white">
            Conecte-se
            <IconCaret direction={open ? 'up' : 'down'} className="w-4 h-4" />
          </Disclosure.Button>
          <div
            className={`${
              open ? 'max-h-64 pb-4' : 'max-h-0'
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
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
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

