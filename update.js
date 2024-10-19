import http from 'http';
import { exec } from 'child_process';

console.log('Starting webhook.');

http
	.createServer((req, res) => {
		if (req.method === 'POST') {
			let body = '';

			req.on('data', (chunk) => {
				body += chunk.toString();
			});

			req.on('end', () => {
				// const signature = req.headers['x-hub-signature-256'];

				console.log('New POST request at: ' + new Date().toLocaleString());
				console.log(body);

				exec('bash /var/www/html/net.zlyfer/update.sh', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					console.log(`stdout: ${stdout}`);
					console.error(`stderr: ${stderr}`);
				});

				res.writeHead(200);
				res.end();
			});
		} else {
			res.writeHead(200);
			res.end();
		}
	})
	.listen(9000);
