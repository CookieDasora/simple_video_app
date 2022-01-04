import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import validator from 'validator';
import { sign } from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import IUserRequest from '../interfaces/userRequest.interface';

class authenticateUserService {
  async execute({ email, password }: IUserRequest): Promise<Error | Object> {
    const repo = getRepository(User);

    if (validator.isEmail(email) === false || !(await repo.findOne({ where: { email } }))) {
      return new Error('Invalid email or password');
    }

    if (email === undefined || password === undefined) {
      return new Error('Missing fields');
    }

    const user = await repo.findOne({ where: { email } });

    const comparePassword = compare(password, user.password);

    if (await comparePassword === false) {
      return new Error('Invalid email or password');
    }

    const { username, id, created_at } = user;

    const token = sign({
      username, id, created_at, email,
    }, process.env.JWT_SECRET, { expiresIn: '20s' });

    return {
      username,
      created_at,
      token,
    };
  }
}

export default authenticateUserService;
