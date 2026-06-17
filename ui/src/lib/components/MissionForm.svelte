<script lang="ts">
  import { Button, Input, Textarea } from '@sentropic/design-system-svelte';

  type Props = {
    onsubmit?: (payload: { title: string; context: string }) => void;
  };

  let { onsubmit }: Props = $props();

  let title = $state('');
  let context = $state('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    onsubmit?.({ title, context });
    title = '';
    context = '';
  };
</script>

<form onsubmit={handleSubmit} class="mission-form">
  <Input label="Titre" bind:value={title} required />
  <Textarea label="Contexte" rows={4} bind:value={context} />
  <div class="actions">
    <Button type="submit">Ajouter</Button>
  </div>
</form>

<style>
  .mission-form {
    display: grid;
    gap: 0.75rem;
    max-width: 480px;
  }
  .actions {
    display: flex;
  }
</style>
