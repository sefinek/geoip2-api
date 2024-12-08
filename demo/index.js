const geoIp = require('geoip2-api');

(async () => {
	const data = await geoIp.get('185.21.84.216');
	console.log(data);
})();