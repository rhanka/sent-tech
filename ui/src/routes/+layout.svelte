<script lang="ts">
  import '../lib/i18n';
  import '../app.css';
  import { ThemeProvider } from '@sentropic/design-system-svelte';
  import { sentTechTheme } from '@sentropic/design-system-themes';
</script>

<svelte:head>
  <title>SENT-tech Offer Builder</title>
</svelte:head>

<ThemeProvider theme={sentTechTheme}>
  <div class="app-shell">
    <slot />
  </div>
</ThemeProvider>

<style>
  .app-shell {
    min-height: 100vh;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
