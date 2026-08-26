#!/usr/bin/env bash
set -euo pipefail

# Ensure the MongoDB data directory exists and is writable by the current user.
sudo mkdir -p /data/db
sudo chown -R "$(id -u):$(id -g)" /data/db

# Start mongod once per boot (idempotent: skip if it is already running).
if ! pgrep -x mongod >/dev/null 2>&1; then
  mongod --dbpath /data/db --port 27017 --bind_ip 127.0.0.1 \
    --fork --logpath /tmp/mongod.log
fi

# Wait for MongoDB to accept connections before returning success.
for _ in $(seq 1 30); do
  if mongosh --quiet --port 27017 --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
    echo "MongoDB is ready on localhost:27017"
    exit 0
  fi
  sleep 1
done

echo "MongoDB failed to become ready on localhost:27017" >&2
exit 1
