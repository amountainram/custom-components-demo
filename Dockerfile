FROM node:20-alpine AS builder

WORKDIR /builder

COPY .yarn/releases .yarn/releases
COPY src src
COPY .yarnrc.yml .yarnrc.yml
COPY package.json package.json
COPY settings.json settings.json
COPY tsconfig.json tsconfig.json
COPY vite.config.ts vite.config.ts
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile
RUN yarn build

########################################################################################################################

FROM nginx:1.25.4-alpine

RUN apk add --no-cache --upgrade \
  # - stop vulnerabilities:package HIGH Vulnerability found in os package type (APKG) - libexpat (fixed in: 2.6.0-r0)(CVE-2023-52425 - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-52425)
  libexpat=2.6.2-r0 \
  # - stop vulnerabilities:package HIGH Vulnerability found in os package type (APKG) - libxml2 (fixed in: 2.11.7-r0)(CVE-2024-25062 - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-25062)
  libxml2=2.11.7-r0 

LABEL name="demo-webcomponents-library-template" \
      description="Use this template to set up a Web-Components library usable in micro-lc" \
      eu.mia-platform.url="https://www.mia-platform.eu" \
      eu.mia-platform.version="0.0.1"

COPY nginx /etc/nginx

RUN touch ./off \
  && chmod o+rw ./off \
  && echo "demo-webcomponents-library-template: $COMMIT_SHA" >> /etc/nginx/commit.sha

WORKDIR /usr/static

COPY LICENSE LICENSE
COPY --from=builder /builder/dist ./

USER nginx
