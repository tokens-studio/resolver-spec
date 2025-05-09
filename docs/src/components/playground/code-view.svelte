<script lang="ts">
  export interface File {
    filename: string;
    lang: string;
    contents: string;
  }

  let { files }: { files: File[] } = $props();

  let activeFile = $state(0);
</script>

<div class="wrapper">
  <ul role="tablist">
    {#each files as file, i}
      <li role="presentation">
        <button
          role="tab"
          aria-selected={activeFile === i}
          aria-controls={file.filename}
          onclick={() => (activeFile = i)}>{file.filename}</button
        >
      </li>
    {/each}
  </ul>

  {#each files as file, i}
    <div role="tabpanel" id={file.filename} hidden={activeFile === i ? undefined : true}>
      {file.contents}
    </div>
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: min-content auto;
  }

  [role='tablist'] {
    --offset-height: 4rem;

    background-color: var(--bgColor-muted);
    list-style: none;
    margin: 0;
    height: calc(100vh - var(--offset-height));
    padding: 0;
    position: sticky;
    top: var(--offset-height);
    z-index: 10;

    li {
      display: block;
      margin: 0;
      padding: 0;
    }
  }

  [role='tab'] {
    background: none;
    border: none;
    border-radius: none;
    color: inherit;
    display: flex;
    font-size: var(--text-body-size-small);
    font-family: inherit;
    line-height: 1;
    margin: 0;
    outline: 1px solid transparent;
    padding: 0.5rem;
    white-space: nowrap;
    width: 100%;

    &:focus-visible {
      outline-color: var(--borderColor-accent-emphasis);
    }

    &[aria-selected='true'] {
      background-color: var(--button-default-bgColor-active);
    }
  }

  [role='tabpanel'] {
    font-family: var(--fontStack-monospace);
    font-size: var(--text-codeBlock-size);
    font-weight: var(--text-codeBlock-fontWeight);
    line-height: var(--text-codeBlock-lineHeight);
    margin: 0;
    overflow-x: auto;
    padding: 1.5rem;
    white-space: pre;
  }
</style>
