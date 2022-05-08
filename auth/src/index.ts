import express from 'express';
import 'express-async-errors';

import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = 3000;

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (process.env.JWT_SECRET_KEY) {
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

