#!/bin/bash
source /home/zlyfer/.nvm/nvm.sh

cd /home/zlyfer/websites/zlyfer-svebsite
git pull
nvm use 16.14
npm install
npm run build
systemctl restart svebsite

