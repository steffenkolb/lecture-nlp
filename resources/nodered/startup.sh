#!/bin/bash
docker run \
    -d \
    -it \
    -p 1880:1880 \
    --network iot \
    --mount type=bind,source="$(pwd)"/data,target=/data \
    --name nodered-nlp \
    nodered/node-red-docker