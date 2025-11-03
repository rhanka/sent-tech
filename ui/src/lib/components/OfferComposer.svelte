<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let missions: Array<{ id: string; title: string }> = [];
  export let services: Array<{ id: string; title: string }> = [];
  export let assets: Array<{ id: string; title: string }> = [];
  const dispatch = createEventDispatcher<{ compose: { missionId: string; serviceIds: string[]; assetIds: string[] } }>();

  let missionId = '';
  let serviceIds: string[] = [];
  let assetIds: string[] = [];

  const listSize = (length: number) => Math.max(Math.min(length, 5), 3);

  const onCompose = () => {
    if (!missionId) return;
    dispatch('compose', { missionId, serviceIds, assetIds });
  };
</script>

<section class="composer">
  <label>
    Mission
    <select bind:value={missionId}>
      <option value="">Sélectionner…</option>
      {#each missions as mission}
        <option value={mission.id}>{mission.title}</option>
      {/each}
    </select>
  </label>

  <label>
    Services
    <select bind:value={serviceIds} multiple size={listSize(services.length)}>
      {#each services as service}
        <option value={service.id}>{service.title}</option>
      {/each}
    </select>
  </label>

  <label>
    Assets
    <select bind:value={assetIds} multiple size={listSize(assets.length)}>
      {#each assets as asset}
        <option value={asset.id}>{asset.title}</option>
      {/each}
    </select>
  </label>

  <button on:click={onCompose} disabled={!missionId}>Composer l’offre</button>
</section>

<style>
  .composer {
    display: grid;
    gap: 1rem;
    max-width: 480px;
  }
  select {
    width: 100%;
  }
</style>
