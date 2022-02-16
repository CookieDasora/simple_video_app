import {
  Entity, Column, CreateDateColumn, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

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
      author_id: string;

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
