import { genSaltSync, hashSync } from 'bcrypt';
import validator from 'validator';
import IUserRequest from '../interfaces/UserRequest.interface';
import Queue from '../lib/Queue';
import prisma from '../prisma/Client';

class registerUserService {
  async execute({ username, email, password }: IUserRequest): Promise<Object | Error> {
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      return new Error('Missing fields');
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

    await Queue.add('RegistrationMail', { user });

    delete user.password;

    return user;
  }
}

export default registerUserService;
