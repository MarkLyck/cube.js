#!/bin/bash
set -eo pipefail

# Debug log for test containers
export DEBUG=testcontainers

echo "::group::BigQuery [cloud]"
CUBEJS_TEST_ENV=${TODO}/.env yarn lerna run --concurrency 1 --stream --no-prefix integration:bigquery
echo "::endgroup::"