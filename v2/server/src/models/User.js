import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    email:    { type: String, required: true, unique: true, index: true },
    phone:    { type: String, default: '' },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
