import type { StarlightUserConfig } from '@astrojs/starlight/types';
import { pluginLanguageClass } from './expressive-code-plugin-language-class';

export default {
  expressiveCode: {
    plugins: [
      // Call the plugin initialization function inside the `plugins` array
      pluginLanguageClass(),
    ],
    styleOverrides: {
      textMarkers: {
        defaultLuminance: ['15%', '85%'],
      },
    },
  },
  title: 'Resolver Spec',
  description: 'DTCG draft for token sets & themes resolution.',
  // logo: { src: './public/logo.png', alt: '' },
  editLink: {
    baseUrl: 'https://github.com/tokens-studio/resolver-spec/edit/main/docs',
  },
  // favicon: '/favicon.png',
  social: {
    github: 'https://github.com/tokens-studio/resolver-spec',
    slack:
      'https://join.slack.com/t/tokens-studio/shared_invite/zt-1p8ea3m6t-C163oJcN9g3~YZTKRgo2hg',
  },
  tableOfContents: {
    maxHeadingLevel: 4,
  },
  head: [
    {
      tag: 'meta',
      attrs: {
        name: 'keywords',
        content: 'design, tokens, DTCG, Design Token Community Group, themes, theming, resolver',
      },
    },
    {
      tag: 'meta',
      attrs: {
        name: 'theme-color',
        // TODO: change to new TS brand color
        content: '#11aea7',
      },
    },
    // {
    //   tag: 'meta',
    //   attrs: {
    //     name: 'og:image',
    //     content: '/meta-img.png',
    //   },
    // },
    // {
    //   tag: 'meta',
    //   attrs: {
    //     name: 'og:image:alt',
    //     content: 'Image of Tokens Studio Resolver spec',
    //   },
    // },
  ],
  customCss: ['./src/style.css'],
  components: {
    Head: './src/components/Head.astro',
    Footer: './src/components/Footer.astro',
  },
} as StarlightUserConfig;
