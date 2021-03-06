import { genSaltSync, hashSync } from 'bcrypt';
import validator from 'validator';
import IUserRequest from '../interfaces/UserRequest.interface';
import prisma from '../prisma/Client';

class registerUserService {
  async execute({ username, email, password }: IUserRequest): Promise<Object | Error> {
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      return new Error('Missing fields');
    }

    if (/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(username) === false) {
      return new Error('Username not allowed');
    }

    if (validator.isEmail(email) === false) {
      return new Error('Invalid email');
    }

    if (await prisma.user.findUnique({ where: { username } })) {
      return new Error('User already exists');
    }

    if (await prisma.user.findUnique({ where: { email } })) {
      return new Error('Email already registered');
    }

    const salt = genSaltSync(15);
    const hashPassword = hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    delete user.password;

    return user;
  }
}

export default registerUserService;
