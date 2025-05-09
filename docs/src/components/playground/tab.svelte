<script lang="ts">
  let {
    children,
    'aria-controls': ariaControls,
    'aria-selected': ariaSelected,
    onclick,
  }: {
    'aria-controls': string;
    'aria-selected': boolean;
    onclick: (e: MouseEvent) => void;
  } = $props();
</script>

<li class="wrapper" role="presentation">
  <button
    type="button"
    role="tab"
    aria-selected={ariaSelected}
    aria-controls={ariaControls}
    {onclick}>{@render children()}</button
  >
</li>

<style>
  .wrapper {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  [role='tab'] {
    background: none;
    border-color: transparent;
    border-radius: 0;
    border-style: solid;
    border-width: 3px 0;
    font-size: var(--text-body-size-small);
    margin: 0;
    outline: 1px solid transparent;
    padding: 0.5rem 1rem;

    &:focus-visible {
      outline-color: var(--borderColor-accent-emphasis);
    }

    &[aria-selected='true'] {
      border-bottom-color: var(--borderColor-accent-emphasis);
    }
  }
</style>
