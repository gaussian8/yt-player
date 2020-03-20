# yt-player

Get music playlist from Youtube and play music using home assistant API.

## Project setup
```
cd ./front-end
npm install
npm run build
cd ../back-end
npm install
```

### Project settings
make `./back-end/config/property.js` refering below example
```js
module.exports = {
  redis_host: 'redis',
  redis_port: '6379',
  google_api_key: 'GOOGLE_API_KEY',
  hass_api_key: 'HOME_ASSISTANT_API_KEY',
  HASS_DNS: 'https://YOUR_HA_DNS'
}
```

### Run application
```
cd ./back-end
npm start
```

### Screenshot
![screenshot](./screenshot.png)