const redis = require('redis')

const { promisify } = require('util')

const client = redis.createClient({ host: 'redis' })

const asyncPush = promisify(client.rpush).bind(client)
const asyncList = promisify(client.lrange).bind(client)
const asyncDelete = promisify(client.del).bind(client)
const asyncExists = promisify(client.exists).bind(client)

module.exports = {
  asyncPush,
  asyncList,
  asyncDelete,
  asyncExists
}
