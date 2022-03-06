/* eslint-disable max-len */
import validator from 'validator';
import IVideoRequest from '../interfaces/videoRequest.interface';
import deleteFileFunction from '../functions/deleteFile.function';
import prisma from '../prisma/Client';

class deleteVideoService {
  async execute({ video_id, authorId }: IVideoRequest): Promise<Error | String> {
    const videoDelete = new deleteFileFunction();

    if (validator.isUUID(video_id) === false || !(await prisma.video.findUnique({ where: { video_id } }))) {
      return new Error('Invalid video id');
    }

    if (validator.isUUID(authorId) === false || !(await prisma.user.findUnique({ where: { id: authorId } }))) {
      return new Error('Invalid user id');
    }

    const video = await prisma.video.findUnique({ where: { video_id } });

    if (video.authorId !== authorId) {
      return new Error('Forbidden');
    }

    const result = videoDelete.execute(video.filename);

    if (result instanceof Error) {
      return new Error('Error while deleting the file from S3 Bucket');
    }

    await prisma.video.delete({
      where: {
        video_id,
      },
    });

    return 'Video deleted';
  }
}

export default deleteVideoService;
