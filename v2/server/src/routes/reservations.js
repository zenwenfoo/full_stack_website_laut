import { Router } from 'express';
import authRequired from '../middleware/authRequired.js';
import {
  createReservation,
  listMyReservations,
  getReservation,
  cancelReservation,
  availability
} from '../controllers/reservationController.js';

const router = Router();

router.get('/availability', availability);           // public check
router.use(authRequired);                            // below requires login
router.post('/', createReservation);                 // create
router.get('/mine', listMyReservations);             // list my bookings
router.get('/:id', getReservation);                  // view one
router.put('/:id/cancel', cancelReservation);        // cancel

export default router;
