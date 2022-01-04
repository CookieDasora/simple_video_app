import { getRepository } from 'typeorm';
import validator from 'validator';
import { User } from '../entities/User.entity';

class getUserService {
  async execute(id: string): Promise<User | Error> {
    if (id.length < 36 || id.length > 36 || validator.isUUID(id) === false) {
      return new Error('Invalid ID');
    }

    const repo = getRepository(User);

    const user = await repo.findOne(id, { select: ['id', 'username', 'created_at'] });

    if (user === undefined) {
      return new Error('User doesn\'t exists');
    }

    return user;
  }
}

export default getUserService;
