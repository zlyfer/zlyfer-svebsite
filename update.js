import http from 'http';
import { exec } from 'child_process';
const { secret } = './update-signature.jsonc';

http
	.createServer((req, res) => {
		if (req.method === 'POST') {
			let body = '';

			req.on('data', (chunk) => {
				body += chunk.toString();
			});

			req.on('end', () => {
				const signature = req.headers['x-hub-signature-256'];

				if (signature && signature === 'sha256=' + secret) {
					console.log('Signature valid.');
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
	})
	.listen(9000);
