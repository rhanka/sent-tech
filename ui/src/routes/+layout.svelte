<script lang="ts">
  import '../lib/i18n';
  import '../app.css';
  import { AppShell, ThemeProvider } from '@sentropic/design-system-svelte';
  import { sentTechTheme } from '@sentropic/design-system-themes';
</script>

<svelte:head>
  <title>SENT-tech Offer Builder</title>
</svelte:head>

<ThemeProvider theme={sentTechTheme}>
  <AppShell variant="workspace" class="offer-builder-shell">
    {#snippet main()}
      <slot />
    {/snippet}
  </AppShell>
</ThemeProvider>

<style>
  :global(.offer-builder-shell) {
    --st-component-navShell-width: 0rem;
    --st-component-contextPanel-width: 0rem;
    min-block-size: 100vh;
  }

  :global(.offer-builder-shell .st-appShell__main) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 640px) {
    :global(.offer-builder-shell .st-appShell__main) {
      padding: 1rem;
    }
  }
</style>
