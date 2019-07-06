var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient();

var redisStore = new RedisStore({ host: 'localhost', port: 6379, client: client, ttl: 60*60*10 });

function getAllActiveSessions() {
    return new Promise((resolve, reject) => {
        redisStore.all(function(err, sessions) {
            if(err) reject(err);
            else resolve(sessions);
        });
    });
}

module.exports = { redisStore, getAllActiveSessions };