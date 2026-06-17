export const env = {
  port: Number(process.env.PORT ?? 8787),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://senttech:senttech@localhost:5432/senttech',
  openAiApiKey: process.env.OPENAI_API_KEY ?? '',
  corsAllowedOrigins: (process.env.CORS_ALLOWED_ORIGINS ?? 'http://localhost:5173').split(',')
};
