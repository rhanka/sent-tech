<script lang="ts">
  import { Badge, Card } from '@sentropic/design-system-svelte';

  type Props = {
    assets?: Array<{ id: string; title: string; type: string; content?: string }>;
  };

  let { assets = [] }: Props = $props();
</script>

<section class="asset-list">
  {#if assets.length === 0}
    <p>Aucun asset disponible.</p>
  {:else}
    {#each assets as asset (asset.id)}
      <Card>
        <header class="asset-header">
          <h3>{asset.title}</h3>
          <Badge tone="info">{asset.type}</Badge>
        </header>
        {#if asset.content}
          <pre>{asset.content}</pre>
        {/if}
      </Card>
    {/each}
  {/if}
</section>

<style>
  .asset-list {
    display: grid;
    gap: 1rem;
  }
  .asset-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  .asset-header h3 {
    margin: 0;
  }
  pre {
    white-space: pre-wrap;
    margin-top: 0.75rem;
  }
</style>
