const http = require('http');
const { exec } = require('child_process');
const secret = '2ShCW82rZUmz&CBBgsc$$bBmZ%wxR656';

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const signature = req.headers['x-hub-signature-256'];

      if (signature && signature === secret) {
        // Execute the update script
        exec('bash /home/zlyfer/websites/zlyfer-svebsite/update.sh', (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });
      }

      res.writeHead(200);
      res.end();
    });
  } else {
    res.writeHead(200);
    res.end();
  }
}).listen(9000);

