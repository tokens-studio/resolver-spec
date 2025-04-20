<script lang="ts">
  import Tab from './tab.svelte';
  import Tablist from './tablist.svelte';
  import Resolver from './resolver.svelte';

  // Example 1 setup
  import lightDarkExample from './examples/light-dark.json';
  import primerColorLight from '../../../../src/data/github-primer/color/light.json';
  import primerColorLightHC from '../../../../src/data/github-primer/color/light.high-contrast.json';
  import primerColorDark from '../../../../src/data/github-primer/color/dark.json';
  import primerColorDarkHC from '../../../../src/data/github-primer/color/dark.high-contrast.json';
  import primerColorDarkDimmed from '../../../../src/data/github-primer/color/dark.dimmed.json';
  import primerSize from '../../../../src/data/github-primer/size/size.json';

  // Note: it’s not a hard requirement that all token files get
  // passed around as strings, but they’re simpler to memoize
  const examples = [
    {
      id: 'light-dark',
      name: 'Example 1: Theming',
      resolver: JSON.stringify(lightDarkExample, undefined, 2),
      tokens: [
        {
          filename: 'color/light.json',
          lang: 'json',
          contents: JSON.stringify(primerColorLight, undefined, 2),
        },
        {
          filename: 'color/light.high-contrast.json',
          lang: 'json',
          contents: JSON.stringify(primerColorLightHC, undefined, 2),
        },
        {
          filename: 'color/dark.json',
          lang: 'json',
          contents: JSON.stringify(primerColorDark, undefined, 2),
        },
        {
          filename: 'color/dark.high-contrast.json',
          lang: 'json',
          contents: JSON.stringify(primerColorDarkHC, undefined, 2),
        },
        {
          filename: 'color/dark.dimmed.json',
          lang: 'json',
          contents: JSON.stringify(primerColorDarkDimmed, undefined, 2),
        },
      ],
    },
  ];

  let currentTab = $state(examples[0].id);
</script>

<div class="root">
  <Tablist>
    {#each examples as example}
      <Tab
        aria-selected={currentTab === example.id}
        aria-controls={`tabpanel-${example.id}`}
        onclick={() => (currentTab = example.id)}>{example.name}</Tab
      >
    {/each}
  </Tablist>

  <ul class="panels">
    {#each examples as example}
      <li role="tabpanel" id={example.id} hidden={currentTab === example.id ? undefined : true}>
        <Resolver resolver={example.resolver} tokens={example.tokens} />
      </li>
    {/each}
  </ul>
</div>

<style>
  /*
   * Design Tokens from GitHub Primer.
   */
  .root {
    --fontStack-monospace: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
      'Liberation Mono', monospace;
    --text-body-lineHeight-medium: 1.4285;
    --text-body-lineHeight-small: 1.6666;
    --text-body-size-medium: 0.875rem;
    --text-body-size-small: 0.75rem;
    --text-codeBlock-lineHeight: 1.5385;
    --text-codeBlock-size: 0.8125rem;
    --text-codeBlock-weight: 400;

    :global(html[data-theme='light']) & {
      --bgColor-muted: #f6f8fa;
      --borderColor-accent-emphasis: #0969da;
      --borderColor-default: #d1d9e0;
      --button-default-bgColor-active: #e6eaef;
      --fgColor-accent: #0969da;
    }

    :global(html[data-theme='dark']) & {
      --bgColor-muted: #151b23;
      --borderColor-accent-emphasis: #1f6feb;
      --borderColor-default: #3d444d;
      --button-default-bgColor-active: #2a313c;
      --fgColor-accent: #4493f8;
    }

    font-size: var(--text-body-size-medium);
    line-height: var(--text-body-lineHeight-medium);
  }

  .panels {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  [role='tabpanel'] {
    display: block;
    margin: 0;
    padding: 0;
  }
</style>
