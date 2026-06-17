<script lang="ts">
  import { Link } from '@sentropic/design-system-svelte';
  import { exportsStore } from '$lib/stores/exports';
  import { onDestroy, onMount } from 'svelte';

  type ExportJob = { id: string; type: string; status: string; resultUrl?: string };
  let exportsList: ExportJob[] = [];
  let unsubscribe: (() => void) | undefined;

  onMount(() => {
    unsubscribe = exportsStore.subscribe((value) => (exportsList = value));
  });

  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<h2>Exports</h2>
<ul class="exports">
  {#each exportsList as job (job.id)}
    <li>
      <span>{job.type} - {job.status}</span>
      {#if job.resultUrl}
        <Link href={job.resultUrl} external>Télécharger</Link>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .exports {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
