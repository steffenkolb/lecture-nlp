#!/bin/bash
docker run \
  -d \
  -it \
  -p 1883:1883 \
  -p 9001:9001 \
  --network iot \
  --name mqtt-broker \
  eclipse-mosquitto