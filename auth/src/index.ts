import mongoose from 'mongoose';

import { app } from './app';

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`);
  });
}

start();

