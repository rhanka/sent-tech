<script lang="ts">
  import { t } from 'svelte-i18n';
</script>

<section class="hero">
  <h1>{$t('home.title')}</h1>
  <p>{$t('home.subtitle')}</p>
  <nav>
    <a href="/missions">{$t('nav.missions')}</a>
    <a href="/services">{$t('nav.services')}</a>
    <a href="/composer">{$t('nav.composer')}</a>
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
  a {
    color: var(--accent, #4f46e5);
  }
</style>
