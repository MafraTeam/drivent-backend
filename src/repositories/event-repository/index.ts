import { Event } from '@prisma/client';
import { prisma, redis } from '@/config';

const key = 'event';

async function findFirst() {
  const events: Event[] = JSON.parse(await redis.get(key));

  if (events) return events[0];

  const psEvents: Event[] = await prisma.event.findMany();

  await redis.set(key, JSON.stringify(psEvents));

  return psEvents[0];
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
