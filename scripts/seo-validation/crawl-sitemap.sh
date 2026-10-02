#!/bin/sh
# Compatibility wrapper; all evidence and failure handling live in the Node runner.
exec node "$(dirname "$0")/run.mjs" crawl "$@"
