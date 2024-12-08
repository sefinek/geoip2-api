declare module 'geoip2-api' {
    export interface GeoIpData {
        range: [number, number];
        country: string;
        region: string;
        eu: string;
        timezone: string;
        city: string;
        ll: [number, number];
        metro: number;
        area: number;
    }

    export interface ApiResponse {
        success: boolean;
        status: number;
        ip: string;
        data: GeoIpData;
        type: string;
    }

    /**
     * Function to make a GeoIP API request.
     *
     * @param {string} ip - The IP address for which to retrieve location information.
     * @example
     * const geoIp = require('geoip2-api');
     *
     * (async () => {
     *     const data = await geoIp.get('185.21.84.216');
     *     console.log(data);
     * })();
     * @returns {Promise<ApiResponse>} - A promise that resolves to the location data or rejects with an error.
     */
    export function get(ip: string): Promise<ApiResponse>;

    /**
     * Represents the version number of the `geoip2-api` module.
     * This property contains a string that specifies the current version of the module,
     * conforming to the Semantic Versioning (SemVer) standard.
     *
     * @example console.log(geoIp.version); // Displays e.g. '1.0.0'
     * @returns {string} The current version of the module.
     */
    export const version: string;
}