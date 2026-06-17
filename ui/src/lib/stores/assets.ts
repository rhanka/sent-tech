import { writable } from 'svelte/store';
import { apiFetch } from '$lib/config/api';

export type Asset = {
  id: string;
  missionId?: string;
  title: string;
  type: string;
  content?: string;
};

const createStore = () => {
  const { subscribe, set, update } = writable<Asset[]>([]);

  return {
    subscribe,
    load: async () => {
      const response = await apiFetch<{ data: Asset[] }>('/assets');
      set(response.data);
    },
    generate: async (missionId: string) => {
      const response = await apiFetch<{ data: Asset[] }>('/assets/generate', {
        method: 'POST',
        body: JSON.stringify({ missionId })
      });
      update((items) => [...items, ...response.data]);
    }
  };
};

export const assetsStore = createStore();
