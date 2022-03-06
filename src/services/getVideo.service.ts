/* eslint-disable max-len */
import validator from 'validator';
import IVideoRequest from '../interfaces/videoRequest.interface';
import prisma from '../prisma/Client';

class getVideoService {
  async execute({ video_id }: IVideoRequest): Promise<Error | Object> {
    if (validator.isUUID(video_id) === false || !(await prisma.video.findUnique({ where: { video_id } }))) {
      return new Error('Invalid video id');
    }

    const video = await prisma.video.findUnique({
      where: {
        video_id,
      },
      include: {
        author: true,
        category: true,
      },
    });

    if (video === undefined) {
      return new Error('Video doesn\'t exists');
    }

    delete video.author.password;
    delete video.author.email;
    delete video.originalname;
    delete video.filename;
    delete video.size;

    return video;
  }
}

export default getVideoService;
