import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // who booked
    // snapshot contact (so history remains even if user later edits profile)
    name:   { type: String, required: true },
    email:  { type: String, required: true },
    phone:  { type: String, default: '' },

    // booking info
    date:     { type: Date, required: true }, // store date-only (UTC midnight)
    timeslot: { type: String, required: true }, // e.g. "19:00-20:30"
    seats:    { type: Number, min: 1, max: 12, required: true },
    notes:    { type: String, default: '' },

    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

// index for availability queries
reservationSchema.index({ date: 1, timeslot: 1 });

export default mongoose.model('Reservation', reservationSchema);
