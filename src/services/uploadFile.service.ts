import { getRepository } from 'typeorm';
import { User } from '../entities/User.entity';
import { Video } from '../entities/Video.entity';
import IVideoRequest from '../interfaces/videoRequest.interface';

class uploadFileService {
  async execute({
    title,
    description,
    originalname,
    filename,
    size,
    author_id,
  }: IVideoRequest): Promise<Video | Error | string> {
    const repo = getRepository(Video);
    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ where: { id: author_id } });

    if (!user) {
      return new Error('This user doesn\'t exists');
    }

    const video = repo.create({
      title,
      description,
      originalname,
      filename,
      size,
      author_id,
    });

    await repo.save(video);

    return video;
  }
}

export default uploadFileService;
