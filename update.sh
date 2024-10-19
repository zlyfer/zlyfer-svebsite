#!/bin/bash
source /home/zlyfer/.nvm/nvm.sh

cd /var/www/html/net.zlyfer
git pull
nvm use 16.14
npm install
npm run build
systemctl restart svebsite

