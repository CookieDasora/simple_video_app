import { getRepository } from 'typeorm';
import validator from 'validator';
import { User } from '../entities/User.entity';
import { Video } from '../entities/Video.entity';
import IVideoRequest from '../interfaces/videoRequest.interface';
import deleteFileFunction from '../functions/deleteFile.function';

class deleteVideoService {
  async execute({ video_id, author_id }: IVideoRequest): Promise<Error | String> {
    const userRepository = getRepository(User);
    const videoRepository = getRepository(Video);
    const videoDelete = new deleteFileFunction();

    if (validator.isUUID(video_id) === false || !(await videoRepository.findOne(video_id))) {
      return new Error('Invalid video id');
    }

    if (validator.isUUID(author_id) === false || !(await userRepository.findOne(author_id))) {
      return new Error('Invalid user id');
    }

    const video = await videoRepository.findOne(video_id);

    if (video.author_id !== author_id) {
      return new Error('Forbidden');
    }

    const result = videoDelete.execute(video.filename);

    if (result instanceof Error) {
      return new Error('Error while deleting the file from S3 Bucket');
    }

    await videoRepository.delete(video_id);

    return 'Video deleted';
  }
}

export default deleteVideoService;
