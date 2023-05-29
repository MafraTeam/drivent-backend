import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma, redis } from '@/config';
import { CreateTicketParams } from '@/protocols';

const key = 'ticket';

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number): Promise<
  Ticket & {
    TicketType: TicketType;
  }
> {
  const tickets = JSON.parse(await redis.get(`${key}-tickettype`));

  if (tickets) return tickets.filter((t: { enrollmentId: number }) => t.enrollmentId === enrollmentId)[0];

  const psTickets = await prisma.ticket.findMany({
    include: {
      TicketType: true, //join
    },
  });

  await redis.set(`${key}-tickettype`, JSON.stringify(psTickets));

  return psTickets.filter((t) => t.enrollmentId === enrollmentId)[0];
}

async function createTicket(ticket: CreateTicketParams) {
  await redis.del(`${key}-enrollment`);
  await redis.del(`${key}-tickettype`);

  return await prisma.ticket.create({
    data: ticket,
  });
}

async function findTickeyById(ticketId: number) {
  const tickets: Ticket[] = JSON.parse(await redis.get(`${key}-enrollment`));

  if (tickets) return tickets.filter((t) => t.id === ticketId)[0];

  const psTickets = await prisma.ticket.findMany({
    include: {
      Enrollment: true,
    },
  });

  await redis.set(`${key}-enrollment`, JSON.stringify(psTickets));

  return psTickets.filter((t) => t.id === ticketId)[0];
}

async function findTickeWithTypeById(ticketId: number) {
  const tickets = JSON.parse(await redis.get(`${key}-tickettype`));

  if (tickets) return tickets.filter((t: { id: number }) => t.id === ticketId)[0];

  const psTickets = await prisma.ticket.findMany({
    include: {
      TicketType: true,
    },
  });

  await redis.set(`${key}-tickettype`, JSON.stringify(psTickets));

  return psTickets.filter((t) => t.id === ticketId)[0];
}

async function ticketProcessPayment(ticketId: number) {
  await redis.del(`${key}-enrollment`);
  await redis.del(`${key}-tickettype`);

  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

export default {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTickeyById,
  findTickeWithTypeById,
  ticketProcessPayment,
};
