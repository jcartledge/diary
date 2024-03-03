FROM mcr.microsoft.com/playwright:v1.42.1-jammy as e2e

RUN corepack enable

COPY package.json .
RUN pnpm --ignore-scripts install

COPY . .
