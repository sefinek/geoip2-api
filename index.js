const https = require('node:https');
const { name, version, devDependencies } = require('./package.json');

const headers = {
	'User-Agent': `${name}/${version} (+https://github.com/sefinek/geoip2-api)${process.env.JEST_WORKER_ID ? ` jest/${devDependencies.jest.replace(/^[^0-9]*/, '')}` : ''}`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive',
	'DNT': '1',
};

const timeout = 25000;

const get = async ip => {
	if (!ip || typeof ip !== 'string') throw new Error('A valid IP address is required');

	return new Promise((resolve, reject) => {
		const req = https.get(`https://api.sefinek.net/api/v2/geoip/${ip}`, { headers, timeout }, res => {
			const { statusCode } = res;
			if (statusCode < 200 || statusCode >= 300) {
				req.destroy();
				return reject(new Error(`HTTP Status Code: ${statusCode}`));
			}

			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => {
				try {
					resolve(JSON.parse(data));
				} catch (err) {
					reject(err);
				}
			});
		});

		req.on('error', err => {
			req.destroy();
			reject(err);
		});

		req.on('timeout', () => {
			req.destroy();
			reject(new Error(`Request timed out after ${timeout} ms.`));
		});
	});
};

module.exports = { get, version };