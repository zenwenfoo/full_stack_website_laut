import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import reservationRoutes from "./routes/reservations.js";
import contactRoutes from "./routes/contact.js";
import path from "path";
import subscribeRoutes from "./routes/subscribe.js";

const app = express();

function noCache(req, res, next) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
}

app.set("etag", false);

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/api/health', noCache, (req, res) => res.json({ ok: true }));

app.use('/api/auth', noCache, authRoutes);
app.use('/api/users', noCache, userRoutes);
app.use("/api/reservations", noCache, reservationRoutes);
app.use("/api/contact", noCache, contactRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/subscribe", subscribeRoutes);

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Mongo connection error:', err.message);
    process.exit(1);
  });
