#!/bin/bash
set -e

if [ "$1" = 'app' ]; then
    exec npm start $2
fi

if [ "$1" = 'test' ]; then
    NODE_ENV=test exec npm test $2
fi

exec "$@"
