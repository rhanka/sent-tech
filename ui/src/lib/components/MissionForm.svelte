<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ submit: { title: string; context: string } }>();

  let title = '';
  let context = '';

  const onSubmit = () => {
    dispatch('submit', { title, context });
    title = '';
    context = '';
  };
</script>

<form on:submit|preventDefault={onSubmit} class="mission-form">
  <label>
    Titre
    <input bind:value={title} required />
  </label>
  <label>
    Contexte
    <textarea bind:value={context} rows={4}></textarea>
  </label>
  <button type="submit">Ajouter</button>
</form>

<style>
  .mission-form {
    display: grid;
    gap: 0.75rem;
    max-width: 480px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  button {
    justify-self: flex-start;
  }
</style>
