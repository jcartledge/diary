FROM node:14.17-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY build .
HEALTHCHECK --interval=5s --timeout=60s --start-period=5s --retries=12 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/.well-known/apollo/server-health || exit 1
CMD node index.js