<script lang="ts">
  import OfferComposer from '$lib/components/OfferComposer.svelte';
  import ExportPanel from '$lib/components/ExportPanel.svelte';
  import { missionsStore } from '$lib/stores/missions';
  import { servicesStore } from '$lib/stores/services';
  import { assetsStore } from '$lib/stores/assets';
  import { exportsStore } from '$lib/stores/exports';
  import { onDestroy, onMount } from 'svelte';

  type Mission = { id: string; title: string };
  type Service = { id: string; title: string };
  type Asset = { id: string; title: string };
  type ExportJob = { id: string; type: string; resultUrl?: string; payload?: Record<string, unknown> };

  let missions: Mission[] = [];
  let services: Service[] = [];
  let assets: Asset[] = [];
  let lastJob: ExportJob | null = null;
  const unsubscribers: Array<() => void> = [];

  onMount(async () => {
    await Promise.all([missionsStore.load(), servicesStore.load(), assetsStore.load()]);
    unsubscribers.push(missionsStore.subscribe((value) => (missions = value)));
    unsubscribers.push(servicesStore.subscribe((value) => (services = value)));
    unsubscribers.push(assetsStore.subscribe((value) => (assets = value)));
  });

  onDestroy(() => {
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  });

  const handleCompose = async (detail: { missionId: string; serviceIds: string[]; assetIds: string[] }) => {
    const payload = {
      type: 'offer_html',
      payload: {
        missionId: detail.missionId,
        serviceIds: detail.serviceIds,
        assetIds: detail.assetIds,
        templateId: 'offer-html-fr'
      }
    };
    lastJob = await exportsStore.create(payload);
  };

  const handleExport = async (detail: { type: string }) => {
    if (!lastJob) return;
    const previousPayload = (lastJob.payload ?? {}) as Record<string, unknown>;
    lastJob = await exportsStore.create({
      type: detail.type,
      payload: {
        missionId: previousPayload.missionId ?? '',
        serviceIds: (previousPayload.serviceIds as string[] | undefined) ?? [],
        assetIds: (previousPayload.assetIds as string[] | undefined) ?? [],
        templateId: detail.type === 'case_study' ? 'case-study-fr' : 'offer-html-fr'
      }
    });
  };
</script>

<h2>Composer une offre</h2>
<OfferComposer {missions} {services} {assets} oncompose={handleCompose} />
<ExportPanel {lastJob} onexport={handleExport} />
