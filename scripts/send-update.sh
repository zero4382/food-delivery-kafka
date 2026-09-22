#!/bin/sh

ORDER_ID="${1:-101}"
STATUS="${2:-READY}"

curl --fail-with-body --silent --show-error \
  --request POST "http://localhost:3000/orders/${ORDER_ID}/status" \
  --header "Content-Type: application/json" \
  --data "{\"status\":\"${STATUS}\"}"
printf "\n"
