#!/bin/sh
yarn build
sed -i 's/My page/Donation Platform/g' build/index.html
cp $1 build/
echo "the item is " $1

sed -i 's/favicon.ico/logo.png/g' build/index.html
