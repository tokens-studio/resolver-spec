import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';
import starlightConfig from './starlight-config';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight(starlightConfig), svelte()],
  site: 'https://resolver-spec.tokens.studio',
  vite: {
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
