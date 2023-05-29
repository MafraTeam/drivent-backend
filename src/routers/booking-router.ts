import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, getBookingsByHotelId, listBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', listBooking)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking)
  .get('/:hotelId', getBookingsByHotelId);

export { bookingRouter };
