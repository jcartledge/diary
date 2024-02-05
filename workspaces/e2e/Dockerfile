FROM mcr.microsoft.com/playwright:v1.41.2-jammy as e2e

RUN corepack enable

COPY package.json .
RUN pnpm install

COPY . .
