import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
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
        image:
          'https://img.freepik.com/fotos-gratis/tipo-complexo-de-entretenimento-o-popular-resort-com-piscinas-e-parques-aquaticos-na-turquia-hotel-de-luxo-recorrer_146671-18827.jpg',
        Rooms: {
          create: [
            { name: 'Room 200', capacity: 3 },
            { name: 'Room 201', capacity: 2 },
            { name: 'Room 202', capacity: 1 },
            { name: 'Room 203', capacity: 2 },
            { name: 'Room 204', capacity: 1 },
            { name: 'Room 205', capacity: 3 },
            { name: 'Room 206', capacity: 1 },
            { name: 'Room 207', capacity: 2 },
            { name: 'Room 208', capacity: 2 },
            { name: 'Room 209', capacity: 3 },
            { name: 'Room 210', capacity: 2 },
            { name: 'Room 211', capacity: 1 },
            { name: 'Room 212', capacity: 3 },
            { name: 'Room 213', capacity: 2 },
            { name: 'Room 214', capacity: 1 },
            { name: 'Room 215', capacity: 3 },
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
            { name: 'Room 300', capacity: 2 },
            { name: 'Room 301', capacity: 3 },
            { name: 'Room 302', capacity: 2 },
            { name: 'Room 303', capacity: 3 },
            { name: 'Room 304', capacity: 3 },
            { name: 'Room 305', capacity: 2 },
            { name: 'Room 306', capacity: 2 },
            { name: 'Room 307', capacity: 1 },
            { name: 'Room 308', capacity: 3 },
            { name: 'Room 309', capacity: 1 },
            { name: 'Room 310', capacity: 2 },
            { name: 'Room 311', capacity: 1 },
            { name: 'Room 312', capacity: 2 },
            { name: 'Room 313', capacity: 1 },
            { name: 'Room 314', capacity: 1 },
            { name: 'Room 315', capacity: 3 },
          ],
        },
      },
    });
  }
  hotels = await prisma.hotel.findFirst();

  let ticketTypes = await prisma.ticketType.findFirst();
  if (!ticketTypes) {
    const presencialComHotel = await prisma.ticketType.create({
      data: {
        name: 'Presencial com Hotel',
        price: 400,
        isRemote: false,
        includesHotel: true,
      },
    });

    const presencialSemHotel = await prisma.ticketType.create({
      data: {
        name: 'Presencial sem Hotel',
        price: 150,
        isRemote: false,
        includesHotel: false,
      },
    });

    const remoto = await prisma.ticketType.create({
      data: {
        name: 'Online',
        price: 50,
        isRemote: true,
        includesHotel: false,
      },
    });
  }
  ticketTypes = await prisma.ticketType.findFirst();

  const activities = await prisma.activity.findFirst();

  if (!activities) {
    await prisma.activity.createMany({
      data: [
        {
          startDate: new Date(2023, 6, 1, 9, 0, 0),
          finishDate: new Date(2023, 6, 1, 10, 0, 0),
          eventName: 'Programação com Portugol',
          image: 'https://i.ytimg.com/vi/w42ZlTYoQuc/maxresdefault.jpg',
          localName: 'Auditório do Centro Cultural',
          vacancies: 10,
        },
        {
          startDate: new Date(2023, 6, 1, 9, 30, 0),
          finishDate: new Date(2023, 6, 1, 12, 0, 0),
          eventName: 'Introdução a Programação',
          image: 'https://correiopaulista.com/wp-content/uploads/2019/08/cubo-magico-1024x576.jpg',
          localName: 'Auditório do Centro Cultural',
          vacancies: 20,
        },
        {
          startDate: new Date(2023, 6, 2, 12, 0, 0),
          finishDate: new Date(2023, 6, 2, 14, 30, 0),
          eventName: 'Introdução a Cálculo 1',
          image: 'https://cdn.fs.teachablecdn.com/HrLbVCOAQ9iD91LsGRcW',
          localName: 'Engenharias ABBA',
          vacancies: 10,
        },
        {
          startDate: new Date(2023, 6, 3, 11, 0, 0),
          finishDate: new Date(2023, 6, 3, 12, 30, 0),
          eventName: 'Introdução ao Marketing Digital',
          image: 'https://futurereport.schibsted.com/wp-content/uploads/2016/10/DIGITAL-MARKETING.jpg',
          localName: 'Rei do Marketing',
          vacancies: 10,
        },
        {
          startDate: new Date(2023, 6, 2, 12, 0, 0),
          finishDate: new Date(2023, 6, 2, 15, 0, 0),
          eventName: 'Evento Teste 1',
          image: 'https://i.ytimg.com/vi/2CVQfApdhIc/maxresdefault.jpg',
          localName: 'Local Teste',
          vacancies: 1,
        },
        {
          startDate: new Date(2023, 6, 4, 14, 0, 0),
          finishDate: new Date(2023, 6, 4, 15, 0, 0),
          eventName: 'Evento Teste 2',
          image: 'https://i.ytimg.com/vi/2CVQfApdhIc/maxresdefault.jpg',
          localName: 'Local Teste',
          vacancies: 1,
        },
      ],
    });
  }

  console.log({ event, hotels, ticketTypes });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
