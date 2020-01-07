#!/bin/sh
yarn build
sed -i 's/My page/Donation Platform/g' build/index.html
cp logo_.png build

sed -i 's/favicon.ico/logo_.png/g' build/index.html
