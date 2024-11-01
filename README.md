<div align="center">
    <h1>🗺️ GeoIP Lite 2: API Wrapper</h1>
    <a href="https://www.npmjs.com/package/geoip2-api">
        <img src="https://img.shields.io/npm/dt/geoip2-api?maxAge=3600" alt="The number of downloads">
        <img src="https://img.shields.io/github/last-commit/sefinek/geoip2-api" alt="Last commit">
        <img src="https://img.shields.io/github/issues/sefinek/geoip2-api" alt="Issues">
        <img src="https://img.shields.io/github/commit-activity/w/sefinek/geoip2-api" alt="Commit activity">
        <img src="https://img.shields.io/github/languages/code-size/sefinek/geoip2-api" alt="Code size">
    </a>
</div>


## 📝 Information
This documentation provides information about the lightweight Node.js module designed for sending requests to a geolocation data API.
This module enables you to retrieve location information for a specified IP address and takes full advantage of native modules.
The [official API](https://api.sefinek.net) is thoroughly optimized ⚡ and secure 🔐.

> We use the [MaxMind database](https://www.maxmind.com) in the [geoip-lite2](https://github.com/sefinek/geoip-lite2) module for [our API](https://api.sefinek.net/docs/v2).
> Due to certain limitations, the database is not updated daily (and never will be) by the module's developer. Updates are issued periodically.


## 💻 Locally
There is an alternative to this module that allows for local geolocation retrieval based on a specific IP address.
However, this will increase the memory usage because the alternative module stores the MaxMind database in RAM.

> [geoip-lite2 on npm](https://www.npmjs.com/package/geoip-lite2)


## 📥 Installation
```bash
npm install geoip2-api
```


## 😎 Example
```js
const geoIp = require('geoip2-api');

(async () => {
    const data = await geoIp.get('185.244.214.231');
    console.log(data);
});
```
<div align="center">
    <a href="example.js">Open example.js >></a>
</div>


## ✨ Output
> GET https://api.sefinek.net/api/v2/geoip/185.244.214.231

```json
{
  "success": true,
  "status": 200,
  "validationErr": false,
  "ip": "185.244.214.231",
  "data": {
    "range": [3119830528, 3119830783],
    "country": "PL",
    "region": "14",
    "eu": "1",
    "timezone": "Europe/Warsaw",
    "city": "Warsaw",
    "ll": [52.1574, 21.0126],
    "metro": 0,
    "area": 20
  }
}
```


## 🌠 API Tip
If you want to get the client's geolocation, instead of providing an IP, use `/api/v2/geoip/myip`.


## 💙 Support
For any questions or issues related to the script, please visit the [GitHub repository](https://github.com/sefinek/geoip2-api) for the latest updates and support.

If you like this module, please **star** ⭐ the repository.


## 🔑 MIT License
This GeoIP API client script is provided under the MIT License. See the [LICENSE](LICENSE) file for more details.

Copyright 2023-2024 © by [Sefinek](https://sefinek.net). All Rights Reserved.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsefinek%2Fgeoip2-api.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsefinek%2Fgeoip2-api?ref=badge_large)
