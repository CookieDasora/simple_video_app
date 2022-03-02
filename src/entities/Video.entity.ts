import {
  Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User.entity';

@Entity('videos')
export class Video {
    @PrimaryColumn()
      video_id: string;

    @Column()
      title: string;

    @Column()
      description: string;

    @Column()
      originalname: string;

    @Column()
      filename: string;

    @Column()
      size: number;

    @Column()
      authorId: string;

    // @ts-ignore
    @ManyToOne(() => User, (user) => user.videos)
      author: User;

    @Column()
      url: string;

    @CreateDateColumn()
      created_at: Date;

    constructor() {
      if (!this.video_id) {
        this.video_id = uuid();
      }
    }
}
