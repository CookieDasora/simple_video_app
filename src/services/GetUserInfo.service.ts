import validator from 'validator';
import prisma from '../prisma/Client';

class getUserService {
  async execute(id: string): Promise<Object | Error> {
    if (id.length < 36 || id.length > 36 || validator.isUUID(id) === false) {
      return new Error('Invalid ID');
    }

    const user = await prisma.user.findUnique(
      {
        where: {
          id,
        },
        select: {
          username: true,
          created_at: true,
          id: true,
          videos: {
            select: {
              video_id: true,
              title: true,
              description: true,
              category: true,
              created_at: true,
            },
          },
        },
      },
    );

    if (user === undefined) {
      return new Error('User doesn\'t exists');
    }

    return user;
  }
}

export default getUserService;
