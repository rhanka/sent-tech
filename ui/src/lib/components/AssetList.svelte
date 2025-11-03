<script lang="ts">
  export let assets: Array<{ id: string; title: string; type: string; content?: string }> = [];
</script>

<section class="asset-list">
  {#if assets.length === 0}
    <p>Aucun asset disponible.</p>
  {:else}
    {#each assets as asset}
      <article class="asset-card">
        <header>
          <h3>{asset.title}</h3>
          <span class="badge">{asset.type}</span>
        </header>
        {#if asset.content}
          <pre>{asset.content}</pre>
        {/if}
      </article>
    {/each}
  {/if}
</section>

<style>
  .asset-list {
    display: grid;
    gap: 1rem;
  }
  .asset-card {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  .badge {
    font-size: 0.75rem;
    background: #eef2ff;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  pre {
    white-space: pre-wrap;
  }
</style>
