const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require('../src/common/redis');
const property = require('../config/property');
const wrapper = require('../src/common/utils').wrapper;
const jsonStringify = require('../src/common/utils').jsonStringify;

router.get('/', wrapper(async (req, res, next) => {
  let playlists = await redis.getList('playlists')
  res.send(playlists);
}));

router.get('/:id', wrapper(async (req, res, next) => {
  let musics = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems',
  {
    params: {
      playlistId: req.params.id,
      part: 'snippet',
      key: property.google_api_key,
      maxResults: 50
    }
  })
  res.send(musics.data.items);
}));

router.post('/', wrapper(async (req, res, next) => {
  await redis.rpush('playlists', jsonStringify(req.body))
  res.send('success');
}));

router.post('/:id/modify', wrapper(async (req, res, next) => {
  await redis.lset('playlists', req.params.id, jsonStringify(req.body))
  res.send('success');
}));

router.post('/:id/delete', wrapper(async (req, res, next) => {
  let object = await redis.lindex('playlists', req.params.id)
  await redis.lrem('playlists', jsonStringify(object))
  res.send('success');
}));

module.exports = router;
