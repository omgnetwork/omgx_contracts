#!/bin/bash

# Copyright Optimism PBC 2020
# MIT License
# github.com/ethereum-optimism

cmd="$@"
JSON='{"jsonrpc":"2.0","id":0,"method":"net_version","params":[]}'
SERVE_DIRECTORY=${SERVE_DIRECTORY:-/opt/contracts/dist/dumps}

RETRIES=${RETRIES:-20}
until $(curl --silent --fail \
    --output /dev/null \
    -H "Content-Type: application/json" \
    --data "$JSON" "$L1_NODE_WEB3_URL"); do
  sleep 1
  echo "Will wait $((RETRIES--)) more times for $L1_NODE_WEB3_URL to be up..."

  if [ "$RETRIES" -lt 0 ]; then
    echo "Timeout waiting for layer one node at $L1_NODE_WEB3_URL"
    exit 1
  fi
done

echo "Connected to L1 Node at $L1_NODE_WEB3_URL"

# And now, deploy the contracts
RESULT=$(exec $cmd)
echo $RESULT

# | tee $SERVE_DIRECTORY/addresses.json
# no need to flush the output into addresses.json - we do that directly, now

echo "Starting HTTP server on $SERVER_PORT"
python \
    -m http.server \
    --bind 0.0.0.0 $SERVER_PORT \
    --directory $SERVE_DIRECTORY
