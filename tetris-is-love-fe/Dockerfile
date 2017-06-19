FROM ubuntu:16.04

##### Linux and Node
ENV DEBIAN_FRONTEND noninteractive
ENV NPM_CONFIG_LOGLEVEL info
RUN set -ex \
  && apt-get update \
  && apt-get install -y --force-yes apt-utils curl git bzip2 libfontconfig \
  && curl -sL https://deb.nodesource.com/setup_7.x | bash - \
  && apt-get install --force-yes -y nodejs \
  && npm config set registry https://registry.npmjs.org/ \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge -y --auto-remove apt-utils curl

##### App
COPY tetris-is-love-fe/package.json /tmp/package.json
RUN set -ex \
  && cd /tmp \
  && mkdir -p /tetris-is-love-fe \
  && npm install \
  && cp -a /tmp/node_modules /tetris-is-love-fe/

WORKDIR /tetris-is-love-fe
COPY tetris-is-love-fe/ /tetris-is-love-fe/
RUN npm build

COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["app"]
