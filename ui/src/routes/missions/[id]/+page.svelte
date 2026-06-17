<script lang="ts">
  import { page } from '$app/stores';
  import { assetsStore } from '$lib/stores/assets';
  import AssetList from '$lib/components/AssetList.svelte';
  import { Button } from '@sentropic/design-system-svelte';
  import { onDestroy, onMount } from 'svelte';
  import { get } from 'svelte/store';

  let missionId = '';
  let assets: Array<{ id: string; missionId?: string; title: string; type: string; content?: string }> = [];
  let unsubscribe: (() => void) | undefined;

  onMount(async () => {
    missionId = get(page).params.id;
    await assetsStore.load();
    unsubscribe = assetsStore.subscribe((value) => {
      assets = value.filter((asset) => asset.missionId === missionId || !asset.missionId);
    });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  const handleGenerate = async () => {
    await assetsStore.generate(missionId);
  };
</script>

<h2>Détails mission</h2>
<div class="actions">
  <Button onclick={handleGenerate}>Générer des assets</Button>
</div>
<AssetList {assets} />

<style>
  .actions {
    display: flex;
    margin-block: 0.75rem;
  }
</style>
