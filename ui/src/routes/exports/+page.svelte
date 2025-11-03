<script lang="ts">
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
<ul>
  {#each exportsList as job}
    <li>
      {job.type} - {job.status}
      {#if job.resultUrl}
        <a href={job.resultUrl} target="_blank" rel="noreferrer">Télécharger</a>
      {/if}
    </li>
  {/each}
</ul>
