<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let lastJob: { id: string; type: string; resultUrl?: string } | null = null;
  const dispatch = createEventDispatcher<{ export: { type: string } }>();

  let type = 'offer_html';
  const onExport = () => {
    dispatch('export', { type });
  };
</script>

<section class="export-panel">
  <label>
    Format
    <select bind:value={type}>
      <option value="offer_html">HTML</option>
      <option value="offer_pdf">PDF (stub)</option>
      <option value="offer_docx">Docx (stub)</option>
      <option value="offer_pptx">PPTX (stub)</option>
    </select>
  </label>
  <button on:click={onExport}>Lancer l’export</button>

  {#if lastJob}
    <div class="result">
      <p>Dernier export : {lastJob.type}</p>
      {#if lastJob.resultUrl}
        <a href={lastJob.resultUrl} target="_blank" rel="noreferrer">Télécharger</a>
      {/if}
    </div>
  {/if}
</section>

<style>
  .export-panel {
    display: grid;
    gap: 0.75rem;
    max-width: 320px;
  }
</style>
