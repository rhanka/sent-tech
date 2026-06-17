<script lang="ts">
  import { Button, Link, Select } from '@sentropic/design-system-svelte';

  type Props = {
    lastJob?: { id: string; type: string; resultUrl?: string } | null;
    onexport?: (payload: { type: string }) => void;
  };

  let { lastJob = null, onexport }: Props = $props();

  let type = $state('offer_html');
  const onExport = () => {
    onexport?.({ type });
  };
</script>

<section class="export-panel">
  <Select label="Format" bind:value={type}>
    <option value="offer_html">HTML</option>
    <option value="offer_pdf">PDF (stub)</option>
    <option value="offer_docx">Docx (stub)</option>
    <option value="offer_pptx">PPTX (stub)</option>
  </Select>
  <div class="actions">
    <Button onclick={onExport}>Lancer l’export</Button>
  </div>

  {#if lastJob}
    <div class="result">
      <p>Dernier export : {lastJob.type}</p>
      {#if lastJob.resultUrl}
        <Link href={lastJob.resultUrl} external>Télécharger</Link>
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
  .actions {
    display: flex;
  }
  .result {
    display: grid;
    gap: 0.25rem;
  }
</style>
