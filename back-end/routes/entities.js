const express = require('express');
const router = express.Router();
const redis = require('../src/common/redis');
const wrapper = require('../src/common/utils').wrapper;
const jsonStringify = require('../src/common/utils').jsonStringify;
const homeAssistant = require('../src/homeAssistant');

router.get('/', wrapper(async (req, res, next) => {
  let entities = await redis.getList('entities')
  res.send(entities);
}));

router.get('/:id', wrapper(async (req, res, next) => {
  let play_list_count = await redis.llen('play_list')
  let played_list_count = await redis.llen('played_list')
  res.send({
    play_list_count: play_list_count,
    played_list_count: played_list_count
  });
}));

router.post('/', wrapper(async (req, res, next) => {
  await redis.rpush('entities', jsonStringify(req.body))
  res.send('success');
}));

router.post('/:id/modify', wrapper(async (req, res, next) => {
  await redis.lset('entities', req.params.id, jsonStringify(req.body))
  res.send('success');
}));

router.post('/:id/delete', wrapper(async (req, res, next) => {
  let object = await redis.lindex('entities', req.params.id)
  await redis.lrem('entities', jsonStringify(object))
  res.send('success');
}));

router.post('/:id/play', wrapper(async (req, res, next) => {
  await redis.del(['play_list', 'played_list'])
  await redis.rpush('play_list', req.body)
  await homeAssistant.play(req.params.id)
  res.send({
    play_list_count: req.body.length-1,
    played_list_count: 1
  });
}));

router.post('/:id/stop', wrapper(async (req, res, next) => {
  await redis.del(['play_list', 'played_list'])
  res.send({
    play_list_count: 0,
    played_list_count: 0
  });
}));

router.post('/:id/play_pause', wrapper(async (req, res, next) => {
  await homeAssistant.play_pause(req.params.id)
  res.send('success');
}));

router.post('/:id/prev', wrapper(async (req, res, next) => {
  let play_list_count = await redis.llen('play_list');
  let played_list_count = await redis.llen('played_list');
  if (played_list_count > 1) {
    let contents = []
    contents.push(await redis.lpop('played_list'));
    contents.push(await redis.lpop('played_list'));
    await redis.lpush('play_list', contents)
    await homeAssistant.play(req.params.id);
    res.send({
      play_list_count: play_list_count+1,
      played_list_count: played_list_count-1
    });
  } else {
    res.send({
      play_list_count: play_list_count,
      played_list_count: played_list_count
    });
  }
}));

router.post('/:id/next', wrapper(async (req, res, next) => {
  let play_list_count = await redis.llen('play_list');
  let played_list_count = await redis.llen('played_list');
  if (play_list_count > 0) {
    await homeAssistant.play_pause(req.params.id)
    await homeAssistant.play(req.params.id);
    res.send({
      play_list_count: play_list_count-1,
      played_list_count: played_list_count+1
    });
  } else {
    res.send({
      play_list_count: play_list_count,
      played_list_count: played_list_count
    });
  }
}));

module.exports = router;
