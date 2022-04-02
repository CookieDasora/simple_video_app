/* eslint-disable no-param-reassign */
import IVideoRequest from '../interfaces/VideoRequest.interface';
import prisma from '../prisma/Client';

class uploadFileService {
  async execute({
    title,
    description,
    authorId,
    categoryId,
    url,
  }: IVideoRequest): Promise<Object | Error | string> {
    const user = await prisma.user.findUnique({ where: { id: authorId } });

    if (!user) {
      return new Error('This user doesn\'t exists');
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        authorId,
        categoryId,
        url,
      },
    });

    return video;
  }
}

export default uploadFileService;
