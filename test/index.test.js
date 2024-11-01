const geoIp = require('../index.js');

describe('GeoIP Wrapper Module', () => {
	test('Should resolve with valid data for Cloudflare IP address [1.1.1.1]', async () => {
		const cfIp = '1.1.1.1';

		const result = await geoIp.get(cfIp);
		expect(result.success).toBe(true);
		expect(result.status).toBe(200);
		expect(result.ip).toBe(cfIp);
		expect(result.data).toBeDefined();
	});

	test('Should resolve with valid data for Google IP address [8.8.8.8]', async () => {
		const googleIp = '8.8.8.8';

		const result = await geoIp.get(googleIp);
		expect(result.success).toBe(true);
		expect(result.status).toBe(200);
		expect(result.ip).toBe(googleIp);
		expect(result.data).toBeDefined();
		expect(result.data.country).toBe('US');
	});

	test('Should resolve with valid data for a Polish IP address [5.172.224.0]', async () => {
		const validIP = '5.172.224.0';

		const result = await geoIp.get(validIP);
		expect(result.success).toBe(true);
		expect(result.status).toBe(200);
		expect(result.ip).toBe(validIP);
		expect(result.data).toBeDefined();
		expect(result.data.country).toBe('PL');
		expect(result.data.timezone).toBe('Europe/Warsaw');
	});

	test('Should reject with an error for an invalid IP address', async () => {
		const invalidIP = 'invalid.ip';

		try {
			await geoIp.get(invalidIP);
		} catch (result) {
			expect(result).toBeDefined();
			expect(result.message).toBe('HTTP Status Code: 400');
		}
	});

	test('Should resolve with an error for a private IP address', async () => {
		const privateIP = '192.168.1.1';

		try {
			await geoIp.get(privateIP);
		} catch (result) {
			expect(result).toBeDefined();
			expect(result.message).toBe('HTTP Status Code: 403');
		}
	});

	test('Should reject with an error for the loopback IP address [127.0.0.1]', async () => {
		const loopbackIP = '127.0.0.1';

		try {
			await geoIp.get(loopbackIP);
		} catch (result) {
			expect(result).toBeDefined();
			expect(result.message).toBe('HTTP Status Code: 403');
		}
	});

	test('Should resolve with valid data for an IPv4 address [104.113.255.255]', async () => {
		const ipv4Address = '104.113.255.255';

		const result = await geoIp.get(ipv4Address);
		expect(result.success).toBe(true);
		expect(result.status).toBe(200);
		expect(result.ip).toBe(ipv4Address);
		expect(result.data).toBeDefined();
		expect(result.data.country).toBe('PL');
	});

	test('Should reject with an error for a malformed IP address', async () => {
		const malformedIP = '123.456.789.000';

		try {
			await geoIp.get(malformedIP);
		} catch (result) {
			expect(result).toBeDefined();
			expect(result.message).toBe('HTTP Status Code: 400');
		}
	});
});
