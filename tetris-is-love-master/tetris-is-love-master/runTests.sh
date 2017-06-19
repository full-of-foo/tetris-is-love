#!/bin/bash
set -e

export TEST_FLAGS="--color --growl --verbose"
export NODE_ENV="test"

JASMINE_CONFIG_PATH=spec/unit/jasmine.json ./node_modules/.bin/babel-node spec/run.js $TEST_FLAGS
JASMINE_CONFIG_PATH=spec/functional/jasmine.json ./node_modules/.bin/babel-node spec/run.js $TEST_FLAGS
