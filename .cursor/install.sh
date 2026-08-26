#!/usr/bin/env bash
set -euo pipefail

# Install the MongoDB server if it is not already present. The app (app.js) and
# the Jest test suite both connect to a MongoDB instance on localhost:27017, so a
# real mongod must be available in the environment.
if ! command -v mongod >/dev/null 2>&1; then
  curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc \
    | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
    | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
fi

# Install Node.js dependencies.
npm install
