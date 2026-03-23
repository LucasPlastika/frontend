import path from 'node:path';
import {defineConfig, type ViteDevServer} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

function tailwindHMR(): import('vite').Plugin {
  return {
    name: 'tailwind-hmr',
    enforce: 'post',
    handleHotUpdate({file, server}: {file: string; server: ViteDevServer}) {
      if (file.match(/\.(tsx?|jsx?)$/)) {
        const cssPath = path.resolve(server.config.root, 'app/styles/app.css');
        const cssModules = server.moduleGraph.getModulesByFile(cssPath);
        if (cssModules) {
          const modules = [...cssModules];
          modules.forEach((mod) => {
            server.moduleGraph.invalidateModule(mod);
          });
          server.ws.send({type: 'full-reload'});
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
    tailwindHMR(),
  ],
  ssr: {
    optimizeDeps: {
      include: ['typographic-base'],
    },
  },
  optimizeDeps: {
    include: [
      'clsx',
      '@headlessui/react',
      'typographic-base',
      'react-intersection-observer',
      'react-use/esm/useScroll',
      'react-use/esm/useDebounce',
      'react-use/esm/useWindowScroll',
    ],
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
});
