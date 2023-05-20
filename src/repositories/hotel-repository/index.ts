import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });

  const roomsWithTakenPlaces = await Promise.all(
    hotel.Rooms.map(async (room) => {
      const takenPlaces = await prisma.booking.count({
        where: {
          roomId: room.id,
        },
      });

      return {
        ...room,
        takenPlaces,
      };
    }),
  );

  const hotelWithRoomsAndTakenPlaces = {
    ...hotel,
    Rooms: roomsWithTakenPlaces,
  };

  return hotelWithRoomsAndTakenPlaces;
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
