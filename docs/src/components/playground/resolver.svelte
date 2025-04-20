<script lang="ts">
  import CodeView, { type File } from './code-view.svelte';
  import { createResolver } from '../../../../src/index.js';

  let { resolver, tokens }: { resolver: string; tokens: File[] } = $props();

  let values = $state(
    Object.fromEntries(
      JSON.parse(resolver).modifiers?.map((mod) => [mod.name, mod.values?.[0]?.name]) ?? [],
    ),
  );

  let parsedResolver = $derived(JSON.parse(resolver));
  let r = $derived(
    createResolver(
      Object.fromEntries(tokens.map((token) => [token.filename, JSON.parse(token.contents)])),
      parsedResolver,
    ),
  );
  let resolverFile = $derived({
    filename: 'resolver.json',
    lang: 'json',
    contents: resolver,
  });
</script>

<div class="wrapper">
  <CodeView files={[resolverFile, ...tokens]} />

  <div class="result">
    <fieldset class="modifiers">
      <legend class="legend">Modifiers</legend>
      {#each parsedResolver.modifiers as modifier}
        <label for={modifier.name}>{modifier.name}</label>
        <select
          id={modifier.name}
          onchange={(e) => {
            values[modifier.name] = e.target.value;
          }}
        >
          {#each modifier.values as value}
            <option value={value.name}>{value.name}</option>
          {/each}
        </select>
      {/each}
    </fieldset>

    <section class="final">
      <h3>Final Tokens</h3>
      <pre class="code"><code>{JSON.stringify(r.apply(values), undefined, 2)}</code></pre>
    </section>
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;

    h3 {
      line-height: 1;
      margin: 0;
      padding: 0.75rem 1rem;
      font-size: 1.25rem;
    }
  }

  .legend {
    display: block;
    position: static;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-block: 1.5rem;
  }

  .modifiers {
    border: 1px solid var(--borderColor-default);
    border-radius: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 0;
    padding: 2rem;
  }

  .final {
    border: 1px solid var(--borderColor-default);
    border-radius: 0.5rem;
    margin: 0;
    padding: 0;
  }

  .code {
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--borderColor-default);
    font-family: var(--text-fontStack-monospace);
    margin: 0;
    white-space: pre;
  }
</style>
