<script lang="ts">
  import { t } from 'svelte-i18n';
  import { Link } from '@sentropic/design-system-svelte';
</script>

<section class="hero">
  <h1>{$t('home.title')}</h1>
  <p>{$t('home.subtitle')}</p>
  <nav>
    <Link href="/missions" variant="standalone">{$t('nav.missions')}</Link>
    <Link href="/services" variant="standalone">{$t('nav.services')}</Link>
    <Link href="/composer" variant="standalone">{$t('nav.composer')}</Link>
  </nav>
</section>

<style>
  .hero {
    padding: 2rem;
  }
  nav {
    display: flex;
    gap: 1rem;
  }
</style>
