import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  const username = 'demo';
  const email = 'demo@example.com';

  let user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    user = await User.create({
      fullName: 'Demo User',
      username,
      email,
      phone: '0123456789',
      passwordHash: await bcrypt.hash('password123', 10),
      avatarUrl: ''
    });
    console.log('Seeded demo user');
  } else {
    console.log('Demo user already exists');
  }

  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
