import type { Context } from 'hono';

export const jsonOk = <T>(c: Context, data: T) => {
  return c.json({ data });
};

export const jsonError = (c: Context, message: string, status = 400) => {
  return c.json({ error: message }, status);
};
