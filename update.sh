#!/bin/bash
cd /home/zlyfer/websites/zlyfer-svebsite
git pull
npm install
npm run build
systemctl --user restart svebsite.service

