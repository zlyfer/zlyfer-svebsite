#!/bin/bash
#source /home/zlyfer/.nvm/nvm.sh

cd /var/www/html/net.zlyfer
git pull
#nvm use 16.14
/home/zlyfer/.local/share/fnm/node-versions/v16.16.0/installation/bin/npm install
/home/zlyfer/.local/share/fnm/node-versions/v16.16.0/installation/bin/npm run build
sudo systemctl restart svebsite
