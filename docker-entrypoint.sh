#!/bin/sh
set -e

mkdir -p /app/logs

chmod -R 777 /app/logs

exec "$@"