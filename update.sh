#!/bin/bash

source /etc/environment
export PATH=$PATH:/home/zlyfer/.local/share/fnm/node-versions/v16.16.0/installation/bin

cd /var/www/html/net.zlyfer
git pull
npm install
npm run build
sudo /usr/bin/systemctl restart svebsite
