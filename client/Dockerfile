FROM nginx:1.19
COPY ./nginx-templates /etc/nginx/templates
COPY ./build/ /usr/share/nginx/html
HEALTHCHECK --interval=5s --timeout=30s --start-period=5s --retries=6 \
  CMD service nginx status
