import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightConfig from './starlight-config';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight(starlightConfig)],
  site: 'https://resolver-spec.tokens.studio',
  vite: {
    force: true,
    server: {
      force: true,
    },
    optimizeDeps: {
      // coz we're doing monkeypatching deps quite often at this stage
      force: true,
      // // due to WASM bindings
      // exclude: ['@rollup/browser'],
      esbuildOptions: {
        // to support top-level-await
        target: 'esnext',
      },
    },
  },
});
