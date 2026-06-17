import { writable } from 'svelte/store';
import { apiFetch } from '$lib/config/api';

export type ExportJob = {
  id: string;
  type: string;
  status: string;
  resultUrl?: string;
  payload?: Record<string, unknown>;
};

const createStore = () => {
  const { subscribe, update } = writable<ExportJob[]>([]);

  return {
    subscribe,
    load: async () => {
      return [];
    },
    create: async (payload: { type: string; payload: Record<string, unknown> }) => {
      const response = await apiFetch<{ data: ExportJob }>('/exports', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      update((items) => [...items, response.data]);
      return response.data;
    },
    get: async (id: string) => {
      const response = await apiFetch<{ data: ExportJob }>(`/exports/${id}`);
      update((items) => items.map((item) => (item.id === id ? response.data : item)));
      return response.data;
    }
  };
};

export const exportsStore = createStore();
