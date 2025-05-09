<script lang="ts">
  let { children } = $props();
</script>

<ul role="tablist">{@render children?.()}</ul>

<style>
  [role='tablist'] {
    border-bottom: 1px solid var(--borderColor-default);
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
