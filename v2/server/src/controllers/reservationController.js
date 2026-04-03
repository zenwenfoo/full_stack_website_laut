import Reservation from '../models/Reservation.js';
import User from '../models/User.js';

// Optional: centralize timeslots so FE/BE can agree
export const TIMESLOTS = [
  "12:00-13:30","12:30-14:00","13:00-14:30","13:30-15:00","14:00-15:30",
  "18:00-19:30","18:30-20:00","19:00-20:30","19:30-21:00","20:00-21:30","20:30-22:00","21:00-22:30"
];

// Capacity per timeslot (tweak or move to .env)
const CAPACITY_PER_SLOT = Number(process.env.SLOT_CAPACITY || 40);

// helper: normalize date to UTC midnight
function toDateOnlyUTC(dateStr) {
  // dateStr expected as "YYYY-MM-DD"
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, (m - 1), d, 0, 0, 0, 0));
}

// POST /api/reservations
export async function createReservation(req, res) {
  try {
    const { name, email, phone, date, time, seats, notes } = req.body;
    if (!name || !email || !date || !time || !seats) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!TIMESLOTS.includes(time)) {
      return res.status(400).json({ error: 'Invalid timeslot' });
    }
    if (seats < 1 || seats > 12) {
      return res.status(400).json({ error: 'Seats must be between 1 and 12' });
    }

    const dateOnly = toDateOnlyUTC(date);

    // no booking in the past
    const now = new Date();
    if (dateOnly < toDateOnlyUTC(now.toISOString().slice(0,10))) {
      return res.status(400).json({ error: 'Date is in the past' });
    }

    // check availability (sum seats on same date+slot, excluding cancelled)
    const agg = await Reservation.aggregate([
      { $match: { date: dateOnly, timeslot: time, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$seats' } } }
    ]);
    const taken = agg[0]?.total || 0;
    const remaining = CAPACITY_PER_SLOT - taken;
    if (seats > remaining) {
      return res.status(409).json({ error: 'Not enough seats available', remaining });
    }

    // grab snapshot of user data
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(401).json({ error: 'Not authenticated' });

    const r = await Reservation.create({
      user: user._id,
      name,
      email,
      phone: phone || '',
      date: dateOnly,
      timeslot: time,
      seats,
      notes: notes || '',
      status: 'Pending'
    });

    res.status(201).json({ id: r._id, status: r.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// GET /api/reservations/mine
export async function listMyReservations(req, res) {
  const list = await Reservation.find({ user: req.user.id })
    .select("name date timeslot email seats notes status")
    .sort({ date: -1, createdAt: -1 })
    .lean();

  const out = list.map(r => ({
    name: r.name,
    date: r.date,
    timeslot: r.timeslot,
    email: r.email,
    seats: r.seats,
    notes: r.notes,
    status: r.status || "Pending",
  }));
  res.json(out);
}

// GET /api/reservations/:id
export async function getReservation(req, res) {
  const r = await Reservation.findById(req.params.id).lean();
  if (!r) return res.status(404).json({ error: 'Not found' });
  if (String(r.user) !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  res.json(r);
}

// PUT /api/reservations/:id/cancel
export async function cancelReservation(req, res) {
  const r = await Reservation.findById(req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  if (String(r.user) !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

  if (r.status === 'Cancelled') return res.json({ ok: true, status: r.status });

  r.status = 'Cancelled';
  await r.save();
  res.json({ ok: true, status: r.status });
}

// GET /api/reservations/availability?date=YYYY-MM-DD&time=12:00-13:30
export async function availability(req, res) {
  try {
    const { date, time } = req.query;
    if (!date || !time) return res.status(400).json({ error: 'date and time are required' });
    if (!TIMESLOTS.includes(time)) return res.status(400).json({ error: 'Invalid timeslot' });

    const dateOnly = toDateOnlyUTC(date);
    const agg = await Reservation.aggregate([
      { $match: { date: dateOnly, timeslot: time, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$seats' } } }
    ]);
    const taken = agg[0]?.total || 0;
    const remaining = CAPACITY_PER_SLOT - taken;
    res.json({ capacity: CAPACITY_PER_SLOT, taken, remaining });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
}
