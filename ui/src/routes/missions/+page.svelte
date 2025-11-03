<script lang="ts">
  import MissionForm from '$lib/components/MissionForm.svelte';
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

  const handleSubmit = async (event: CustomEvent<{ title: string; context: string }>) => {
    await missionsStore.add({ title: event.detail.title, context: event.detail.context });
  };
</script>

<h2>Missions</h2>
<MissionForm on:submit={handleSubmit} />

<ul>
  {#each missions as mission}
    <li>{mission.title}</li>
  {/each}
</ul>
