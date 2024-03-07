FROM mcr.microsoft.com/playwright:v1.42.1-jammy as e2e

RUN corepack enable

COPY /app/.certs/diary-client/ssl.cert .
RUN apt-get update && apt-get install libnss3-tools
RUN mkdir -p $HOME/.pki/nssdb
RUN certutil \
  -d sql:$HOME/.pki/nssdb \
  -A \
  -t "C,," \
  -n diary-client \
  -i ssl.cert

