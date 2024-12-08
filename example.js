const geoIp = require('./index.js');
const ip = '185.21.84.216';

(async () => {
	const data = await geoIp.get(ip);
	console.log(data);
})();

// Output:
//
// {
//     success: true,
//     status: 200,
//     ip: '185.21.84.216',
//     data: {
//         range: [3105182720, 3105183743],
//         country: 'PL',
//         region: '30',
//         eu: '1',
//         timezone: 'Europe/Warsaw',
//         city: 'Piła',
//         ll: [53.1492, 16.7461],
//         metro: 0,
//         area: 20
//     },
//     type: 'unicast'
// }