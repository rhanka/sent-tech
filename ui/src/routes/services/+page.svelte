<script lang="ts">
  import { Card } from '@sentropic/design-system-svelte';
  import { servicesStore } from '$lib/stores/services';
  import { onDestroy, onMount } from 'svelte';

  type Service = { id: string; title: string; summary?: string };
  let services: Service[] = [];
  let unsubscribe: (() => void) | undefined;

  onMount(async () => {
    await servicesStore.load();
    unsubscribe = servicesStore.subscribe((value) => (services = value));
  });

  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<h2>Catalogue de services</h2>
<div class="services">
  {#each services as service (service.id)}
    <Card>
      <strong>{service.title}</strong>
      {#if service.summary}
        <p>{service.summary}</p>
      {/if}
    </Card>
  {/each}
</div>

<style>
  .services {
    display: grid;
    gap: 0.75rem;
  }
  p {
    margin-block: 0.5rem 0;
  }
</style>
