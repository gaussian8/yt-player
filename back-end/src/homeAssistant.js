const axios = require('axios');
const property = require('../config/property');
const redis = require('./common/redis')

async function play (entity_id) {
  let content_id = await redis.lpop('play_list');
  await redis.lpush('played_list', content_id);
  return axios.post(property.HASS_DNS + '/api/services/media_extractor/play_media',
  {
    entity_id: entity_id,
    media_content_id: 'https://www.youtube.com/watch?v=' + content_id,
    media_content_type: 'music'
  },
  {
    headers: {
      'Authorization' : 'Bearer ' + property.hass_api_key
    }
  })
}

async function play_pause (entity_id) {
  return axios.post(property.HASS_DNS + '/api/services/media_player/media_play_pause',
  {
    entity_id: entity_id
  },
  {
    headers: {
      'Authorization' : 'Bearer ' + property.hass_api_key
    }
  })
}

module.exports = {
  play: play,
  play_pause: play_pause
}