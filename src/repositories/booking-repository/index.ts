import { Booking } from '@prisma/client';
import { prisma, redis } from '@/config';

const key = 'booking';

type CreateParams = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParams = Omit<Booking, 'createdAt' | 'updatedAt'>;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  await redis.del(key);

  return await prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  const booking: Booking[] = JSON.parse(await redis.get(key));

  if (booking) return booking.filter((b) => b.roomId === roomId);

  const psBooking = await prisma.booking.findMany({
    include: {
      Room: true,
    },
  });

  await redis.set(key, JSON.stringify(psBooking));

  return psBooking.filter((b) => b.roomId === roomId);
}

async function findByUserId(userId: number) {
  const booking = JSON.parse(await redis.get(`${key}-user-${userId}`));

  if (booking) return booking;

  const psBooking = await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });

  await redis.set(`${key}-user-${userId}`, JSON.stringify(psBooking));

  return psBooking;
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  await redis.del(key);

  return await prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  upsertBooking,
};

export default bookingRepository;
