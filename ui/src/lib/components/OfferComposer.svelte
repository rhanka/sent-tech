<script lang="ts">
  import { Button, MultiSelect, Select } from '@sentropic/design-system-svelte';
  import type { MultiSelectOption } from '@sentropic/design-system-svelte';

  type Props = {
    missions?: Array<{ id: string; title: string }>;
    services?: Array<{ id: string; title: string }>;
    assets?: Array<{ id: string; title: string }>;
    oncompose?: (payload: { missionId: string; serviceIds: string[]; assetIds: string[] }) => void;
  };

  let { missions = [], services = [], assets = [], oncompose }: Props = $props();

  let missionId = $state('');
  let serviceIds = $state<string[]>([]);
  let assetIds = $state<string[]>([]);

  const serviceOptions = $derived<MultiSelectOption[]>(
    services.map((service) => ({ label: service.title, value: service.id }))
  );
  const assetOptions = $derived<MultiSelectOption[]>(
    assets.map((asset) => ({ label: asset.title, value: asset.id }))
  );

  const onCompose = () => {
    if (!missionId) return;
    oncompose?.({ missionId, serviceIds, assetIds });
  };
</script>

<section class="composer">
  <Select label="Mission" bind:value={missionId}>
    <option value="">Sélectionner…</option>
    {#each missions as mission (mission.id)}
      <option value={mission.id}>{mission.title}</option>
    {/each}
  </Select>

  <MultiSelect
    label="Services"
    options={serviceOptions}
    bind:selected={serviceIds}
    placeholder="Sélectionner des services"
  />

  <MultiSelect
    label="Assets"
    options={assetOptions}
    bind:selected={assetIds}
    placeholder="Sélectionner des assets"
  />

  <div class="actions">
    <Button onclick={onCompose} disabled={!missionId}>Composer l’offre</Button>
  </div>
</section>

<style>
  .composer {
    display: grid;
    gap: 1rem;
    max-width: 480px;
  }
  .actions {
    display: flex;
  }
</style>
