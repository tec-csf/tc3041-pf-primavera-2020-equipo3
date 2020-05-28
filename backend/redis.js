const redis = require('redis');
const client = redis.createClient({ port: 13359, host: 'redis-13359.c124.us-central1-1.gce.cloud.redislabs.com', password: 'OT0GJ5Rho8dIFWIJaxeCjlIVM3wpi8dx' });
const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

client.on('connect', function() {
   console.log('Redis client connected');
});

client.on('error', function (err) {
   console.log('Something went wrong ' + err);
});

module.exports={
    set( key, value, exp ){
        client.set(key, value, 'EX', exp, redis.print);
    },
    async get( key ){     
        return await getAsync(key);
    }
}