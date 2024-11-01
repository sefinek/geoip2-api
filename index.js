const https = require('https');
const { name, version, devDependencies } = require('./package.json');

const headers = {
	'User-Agent': `${name}/${version} (+https://github.com/sefinek/geoip2-api)${process.env.JEST_WORKER_ID ? ` jest/${devDependencies.jest.replace(/^[^0-9]*/, '')}` : ''}`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive',
	'DNT': '1'
};

const makeRequest = ip => new Promise((resolve, reject) => {
	const req = https.get(`https://api.sefinek.net/api/v2/geoip/${ip}`, { headers, timeout: 25000 }, res => {
		if ((res.statusCode < 200 || res.statusCode >= 300) && res.statusCode !== 400) {
			return reject(new Error(`HTTP Status Code: ${res.statusCode}`));
		}

		const chunks = [];
		res.on('data', chunk => chunks.push(chunk));
		res.on('end', () => {
			try {
				const data = Buffer.concat(chunks).toString();
				resolve(JSON.parse(data));
			} catch (err) {
				reject(err);
			}
		});
	});

	req.on('error', reject);
	req.setTimeout(7500, () => {
		req.destroy();
		reject(new Error('Timeout error'));
	});
});

module.exports = { get: makeRequest, version };