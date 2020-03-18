const redis = require('redis');
const property = require('../../config/property');
const utils = require('./utils');

const client = redis.createClient({
  host: property.redis_host,
  port: property.redis_port
});
 
client.on('error', function(error) {
  console.error(error);
});
client.on('connect', function() {
  console.info('[Redis] Connected');
});

function get (key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(utils.jsonParse(res))
    })
  })
}

function set (key, value) {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function lindex (key, index) {
  return new Promise((resolve, reject) => {
    client.lindex(key, index, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(utils.jsonParse(res))
    })
  })
}

function lset (key, index, element) {
  return new Promise((resolve, reject) => {
    client.lset(key, index, element, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function lrem (key, element) {
  return new Promise((resolve, reject) => {
    client.lrem(key, 0, element, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function lpush (key, element) {
  return new Promise((resolve, reject) => {
    client.lpush(key, element, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function rpush (key, element) {
  return new Promise((resolve, reject) => {
    client.rpush(key, element, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function getList (key) {
  return new Promise((resolve, reject) => {
    client.lrange(key, 0, -1, (err, res) => {
      if (err) {
        reject(err)
      }
      res = '[' + res + ']'
      resolve(utils.jsonParse(res))
    })
  })
}

function del (key) {
  return new Promise((resolve, reject) => {
    client.del(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function lpop (key) {
  return new Promise((resolve, reject) => {
    client.lpop(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function llen (key) {
  return new Promise((resolve, reject) => {
    client.llen(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}


module.exports = {
  get: get,
  set: set,
  lindex: lindex,
  lset: lset,
  lrem: lrem,
  lpush: lpush,
  rpush: rpush,
  getList: getList,
  del: del,
  lpop: lpop,
  llen: llen
}