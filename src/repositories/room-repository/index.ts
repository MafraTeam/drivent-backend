import { Room } from '@prisma/client';
import { prisma, redis } from '@/config';

const key = 'room';

async function findAllByHotelId(hotelId: number) {
  const rooms: Room[] = JSON.parse(await redis.get(key));

  if (rooms) return rooms.filter((r) => r.hotelId === hotelId);

  const psRooms = await prisma.room.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    include: {
      Booking: true,
      _count: {
        select: {
          Booking: true,
        },
      },
    },
  });

  await redis.set(key, JSON.stringify(psRooms));

  return psRooms.filter((r) => r.hotelId === hotelId);
}

async function findById(roomId: number) {
  const rooms: Room[] = JSON.parse(await redis.get(key));

  if (rooms) return rooms.filter((r) => r.id === roomId)[0];

  const psRooms = await prisma.room.findMany();

  await redis.set(key, JSON.stringify(psRooms));

  return psRooms.filter((r) => r.id === roomId)[0];
}

const roomRepository = {
  findAllByHotelId,
  findById,
};

export default roomRepository;
