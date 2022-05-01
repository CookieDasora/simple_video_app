/* eslint-disable no-param-reassign */
import { compare } from 'bcrypt';
import validator from 'validator';
import IUserRequest from '../interfaces/UserRequest.interface';
import prisma from '../prisma/Client';

class updateUserInfoService {
  async execute({
    id, username, password,
  }: IUserRequest): Promise<Object | Error> {
    if (validator.isUUID(id) === false
    || !(await prisma.user.findUnique({ where: { id } }))) {
      return new Error('Invalid user id');
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (username.length === 0) {
      username = user.username;
    }

    const comparePassword = compare(password, user.password);

    if (await comparePassword === false) {
      return new Error('Invalid password');
    }

    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
      select: {
        username: true,
        created_at: true,
        id: true,
      },
    });

    return updated;
  }
}

export default updateUserInfoService;
