import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

export let redis: RedisClientType;

export async function connectRedis(): Promise<void> {
  redis = createClient();
  redis.on('error', (error) => console.log('Redis database connection error: ', error));
  await redis.connect();
}

export async function disconnectRedis() {
  await redis.disconnect();
}
