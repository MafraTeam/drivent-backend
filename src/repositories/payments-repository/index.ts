import { Payment } from '@prisma/client';
import { prisma, redis } from '@/config';
import { PaymentParams } from '@/protocols';

const key = 'payment';

async function findPaymentByTicketId(ticketId: number) {
  const payment: Payment[] = JSON.parse(await redis.get(key));

  if (payment) return payment.filter((p) => p.ticketId === ticketId)[0];

  const psPayments = await prisma.payment.findMany();

  await redis.set(key, JSON.stringify(psPayments));

  return psPayments.filter((p) => p.ticketId === ticketId)[0];
}

async function createPayment(ticketId: number, params: PaymentParams) {
  await redis.del(key);

  return await prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export default { findPaymentByTicketId, createPayment };
