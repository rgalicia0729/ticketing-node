import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Password } from '../services/password';
import { validateRequest } from '../middlewares/validate-request';
import { NotAuthorizedError } from '../errors/not-authorized-error';

const router = express.Router();

router.post('/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must be supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new NotAuthorizedError();
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new NotAuthorizedError();
    }

    const accessToken = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_SECRET_KEY!);

    req.session = { accessToken };

    res.send(existingUser);
  },
);

export { router as signinRouter }