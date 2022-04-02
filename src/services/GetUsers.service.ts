import prisma from '../prisma/Client';

class getUsersService {
  async execute() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        created_at: true,
      },
    });

    return users;
  }
}

export default getUsersService;
