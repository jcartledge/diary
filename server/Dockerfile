FROM node:16.0
ENV NODE_ENV=production

WORKDIR /app
COPY . .
RUN yarn install --production
RUN find . -name *.test.ts -delete
RUN yarn tsc

FROM node:16.0
ENV NODE_ENV=production
WORKDIR /app
COPY --from=0 /app/build .
COPY --from=0 /app/node_modules node_modules
CMD node index.js