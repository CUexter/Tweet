#!/bin/sh

PB_VERSION="0.11.4"

wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip -O pb.zip

unzip -o pb.zip -d ./pb/

rm pb.zip
