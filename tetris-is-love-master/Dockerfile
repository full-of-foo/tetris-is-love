FROM ubuntu:16.04

##### Linux and Node
ENV DEBIAN_FRONTEND noninteractive
ENV NPM_CONFIG_LOGLEVEL info
RUN set -ex \
  && apt-get update \
  && apt-get install -y --force-yes apt-utils curl git \
  && curl -sL https://deb.nodesource.com/setup_7.x | bash - \
  && apt-get install --force-yes -y nodejs \
  && npm config set registry https://registry.npmjs.org/ \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge -y --auto-remove apt-utils curl

##### App
COPY tetris-is-love-master/package.json /tmp/package.json
RUN set -ex \
  && cd /tmp \
  && npm install \
  && mkdir -p /tetris-is-love-master \
  && cp -a /tmp/node_modules /tetris-is-love-master/

WORKDIR /tetris-is-love-master
COPY tetris-is-love-master/ /tetris-is-love-master/
RUN chmod +x runTests.sh

COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["app"]
