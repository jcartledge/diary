FROM nginx:1.21-alpine
COPY ./nginx-templates /etc/nginx/templates
COPY ./build/ /usr/share/nginx/html
HEALTHCHECK --interval=5s --timeout=30s --start-period=5s --retries=6 \
  CMD wget -O /dev/null http://localhost || exit 1
