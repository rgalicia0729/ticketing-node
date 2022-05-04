import express from 'express';

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
