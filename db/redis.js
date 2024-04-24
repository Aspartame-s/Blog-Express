const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

//创建客户端
const redisClient = redis.createClient({
    url: `redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    legacyMode: true
})

//连接
redisClient.connect().then(() => {
    console.log('redis connect success')
}).catch(console.error)

// //创建客户端
// const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

// //建立连接
// (async function () {
//     await redisClient.connect().then(() => console.log('redis connect success!')).catch(console.error)
// })()

module.exports = redisClient