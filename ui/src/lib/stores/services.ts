import { writable } from 'svelte/store';
import { apiFetch } from '$lib/config/api';

export type Service = {
  id: string;
  title: string;
  summary?: string;
};

const createStore = () => {
  const { subscribe, set } = writable<Service[]>([]);

  return {
    subscribe,
    load: async () => {
      const response = await apiFetch<{ data: Service[] }>('/services');
      set(response.data);
    }
  };
};

export const servicesStore = createStore();
