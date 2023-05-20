import { createClient } from 'redis';

const redis = createClient();

redis.on('error', (error) => console.log('Redis database connection error: ', error));

const redisConnect = async () => await redis.connect();

redisConnect();

export { redis };
