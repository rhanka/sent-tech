import { writable } from 'svelte/store';
import { apiFetch } from '$lib/config/api';

export type Mission = {
  id: string;
  title: string;
  context?: string;
};

const createStore = () => {
  const { subscribe, set, update } = writable<Mission[]>([]);

  return {
    subscribe,
    load: async () => {
      const response = await apiFetch<{ data: Mission[] }>('/missions');
      set(response.data);
    },
    add: async (payload: Partial<Mission>) => {
      const response = await apiFetch<{ data: Mission }>('/missions', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      update((items) => [...items, response.data]);
    }
  };
};

export const missionsStore = createStore();
