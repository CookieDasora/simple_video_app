/* eslint-disable max-len */
import { compare } from 'bcrypt';
import validator from 'validator';
import { sign } from 'jsonwebtoken';
import IUserRequest from '../interfaces/userRequest.interface';
import prisma from '../prisma/Client';

class authenticateUserService {
  async execute({ email, password }: IUserRequest): Promise<Error | Object> {
    if (validator.isEmail(email) === false || !(await prisma.user.findUnique({ where: { email } }))) {
      return new Error('Invalid email or password');
    }

    if (email.length === 0 || password.length === 0) {
      return new Error('Missing fields');
    }

    const user = await prisma.user.findUnique({ where: { email } });

    const comparePassword = compare(password, user.password);

    if (await comparePassword === false) {
      return new Error('Invalid email or password');
    }

    const { username, id, created_at } = user;

    const token = sign({
      username, id, created_at, email,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return {
      username,
      created_at,
      token,
    };
  }
}

export default authenticateUserService;
