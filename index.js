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

const timeout = 25000;

const makeRequest = ip => new Promise((resolve, reject) => {
	if (!ip) return reject(new Error('IP address is required.'));

	const req = https.get(`https://api.sefinek.net/api/v2/geoip/${ip}`, { headers, timeout }, res => {
		const { statusCode } = res;
		if ((statusCode < 200 || statusCode >= 300) && statusCode !== 400) return reject(new Error(`HTTP Status Code: ${statusCode}`));

		let data = '';
		res.on('data', chunk => data += chunk);
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(data);
				resolve(parsedData);
			} catch (err) {
				reject(err);
			}
		});
	});

	req.on('error', err => reject(err));
	req.on('timeout', () => {
		req.destroy();
		reject(new Error(`Request timed out (${timeout} ms).`));
	});
});

module.exports = { get: makeRequest, version };