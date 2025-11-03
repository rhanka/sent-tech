<script lang="ts">
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
<ul>
  {#each services as service}
    <li>
      <strong>{service.title}</strong>
      {#if service.summary}
        <p>{service.summary}</p>
      {/if}
    </li>
  {/each}
</ul>
