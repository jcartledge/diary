FROM mcr.microsoft.com/playwright:v1.40.0-jammy as e2e

RUN corepack enable

COPY package.json .
RUN pnpm install

COPY . .
