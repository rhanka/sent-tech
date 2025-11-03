FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm@8.15.4
RUN pnpm install --frozen-lockfile || pnpm install
COPY . .
RUN pnpm build
CMD ["node", "dist/index.js"]
