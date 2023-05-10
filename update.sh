#!/bin/bash
cd /home/zlyfer/websites/zlyfer-svebsite
git pull
#/home/zlyfer/.nvm/versions/node/v16.14.2/bin/npm install
#/home/zlyfer/.nvm/versions/node/v16.14.2/bin/npm run build
nvm use 16
npm install
npm run build
systemctl --user restart svebsite

