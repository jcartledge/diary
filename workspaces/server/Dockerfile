FROM node:21.6-alpine
ENV NODE_ENV=production
USER node
WORKDIR /app
COPY build .
HEALTHCHECK --interval=5s --timeout=30s --start-period=5s --retries=6 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/healthcheck || exit 1
CMD node index.js