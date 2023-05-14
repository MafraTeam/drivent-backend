import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let hotels = await prisma.hotel.findFirst();
  if (!hotels) {
    const drivenResort = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://img.freepik.com/fotos-gratis/salao-de-beleza-spa-com-vista-para-a-praia_53876-31335.jpg',
        Rooms: {
          create: [
            { name: 'Room 100', capacity: 2 },
            { name: 'Room 101', capacity: 2 },
            { name: 'Room 102', capacity: 2 },
            { name: 'Room 103', capacity: 2 },
            { name: 'Room 104', capacity: 1 },
            { name: 'Room 105', capacity: 1 },
            { name: 'Room 106', capacity: 1 },
            { name: 'Room 107', capacity: 1 },
            { name: 'Room 108', capacity: 2 },
            { name: 'Room 109', capacity: 2 },
            { name: 'Room 110', capacity: 2 },
            { name: 'Room 111', capacity: 2 },
            { name: 'Room 112', capacity: 3 },
            { name: 'Room 113', capacity: 2 },
            { name: 'Room 114', capacity: 2 },
            { name: 'Room 115', capacity: 3 },
          ],
        },
      },
    });
  
    const drivenPalace = await prisma.hotel.create({
      data: {
        name: 'Driven Palace',
        image: 'https://img.freepik.com/fotos-gratis/tipo-complexo-de-entretenimento-o-popular-resort-com-piscinas-e-parques-aquaticos-na-turquia-hotel-de-luxo-recorrer_146671-18827.jpg',
        Rooms: {
          create: [
            { name: 'Room 100', capacity: 3 },
            { name: 'Room 101', capacity: 2 },
            { name: 'Room 102', capacity: 1 },
            { name: 'Room 103', capacity: 2 },
            { name: 'Room 104', capacity: 1 },
            { name: 'Room 105', capacity: 3 },
            { name: 'Room 106', capacity: 1 },
            { name: 'Room 107', capacity: 2 },
            { name: 'Room 108', capacity: 2 },
            { name: 'Room 109', capacity: 3 },
            { name: 'Room 110', capacity: 2 },
            { name: 'Room 111', capacity: 1 },
            { name: 'Room 112', capacity: 3 },
            { name: 'Room 113', capacity: 2 },
            { name: 'Room 114', capacity: 1 },
            { name: 'Room 115', capacity: 3 },
          ],
        },
      },
    });
  
    const drivenWorld = await prisma.hotel.create({
      data: {
        name: 'Driven World',
        image: 'https://img.freepik.com/fotos-gratis/viagens-maritimas-moderno-ninguem-infinito_1203-4520.jpg',
        Rooms: {
          create: [
            { name: 'Room 100', capacity: 2 },
            { name: 'Room 101', capacity: 3 },
            { name: 'Room 102', capacity: 2 },
            { name: 'Room 103', capacity: 3 },
            { name: 'Room 104', capacity: 3 },
            { name: 'Room 105', capacity: 2 },
            { name: 'Room 106', capacity: 2 },
            { name: 'Room 107', capacity: 1 },
            { name: 'Room 108', capacity: 3 },
            { name: 'Room 109', capacity: 1 },
            { name: 'Room 110', capacity: 2 },
            { name: 'Room 111', capacity: 1 },
            { name: 'Room 112', capacity: 2 },
            { name: 'Room 113', capacity: 1 },
            { name: 'Room 114', capacity: 1 },
            { name: 'Room 115', capacity: 3 },
          ],
        },
      },
    });
  }

  console.log({ event, hotels });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
