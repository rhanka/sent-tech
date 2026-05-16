<script lang="ts">
  import MissionForm from '$lib/components/MissionForm.svelte';
  import { Link } from '@sentropic/design-system-svelte';
  import { missionsStore } from '$lib/stores/missions';
  import { onDestroy, onMount } from 'svelte';

  type Mission = { id: string; title: string };
  let missions: Mission[] = [];
  let unsubscribe: (() => void) | undefined;

  onMount(async () => {
    await missionsStore.load();
    unsubscribe = missionsStore.subscribe((value) => (missions = value));
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  const handleSubmit = async (payload: { title: string; context: string }) => {
    await missionsStore.add({ title: payload.title, context: payload.context });
  };
</script>

<h2>Missions</h2>
<MissionForm onsubmit={handleSubmit} />

<ul class="missions">
  {#each missions as mission (mission.id)}
    <li>
      <Link href={`/missions/${mission.id}`}>{mission.title}</Link>
    </li>
  {/each}
</ul>

<style>
  .missions {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }
</style>
