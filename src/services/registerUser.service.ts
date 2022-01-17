import { genSaltSync, hashSync } from 'bcrypt';
import { getRepository } from 'typeorm';
import validator from 'validator';
import { User } from '../entities/User.entity';
import IUserRequest from '../interfaces/userRequest.interface';

class registerUserService {
  async execute({ username, email, password }: IUserRequest): Promise<User | Error> {
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      return new Error('Missing fields');
    }

    if (validator.isEmail(email) === false) {
      return new Error('Invalid email');
    }

    const repo = getRepository(User);

    if (await repo.findOne({ username })) {
      return new Error('User already exists');
    }

    if (await repo.findOne({ email })) {
      return new Error('Email already registered');
    }

    const salt = genSaltSync(15);
    const hashPassword = hashSync(password, salt);

    const user = repo.create({
      username,
      email,
      password: hashPassword,
    });

    await repo.save(user);

    return user;
  }
}

export default registerUserService;
