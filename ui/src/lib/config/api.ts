const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8787/api/v1';

export const apiFetch = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...init
  });
  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }
  return await response.json() as T;
};
