import { getRepository } from 'typeorm';
import validator from 'validator';
import { Video } from '../entities/Video.entity';
import IVideoRequest from '../interfaces/videoRequest.interface';

class getVideoService {
  async execute({ video_id }: IVideoRequest): Promise<Error | Video> {
    const repo = getRepository(Video);

    if (validator.isUUID(video_id) === false || !(await repo.findOne(video_id))) {
      return new Error('Invalid video id');
    }

    const video = await repo.findOne(video_id, { select: ['video_id', 'title', 'description', 'author_id', 'created_at', 'url'] });

    if (video === undefined) {
      return new Error('Video doesn\'t exists');
    }

    return video;
  }
}

export default getVideoService;