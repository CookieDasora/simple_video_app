import {
  Entity, Column, CreateDateColumn, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
// import { User } from './User.entity';

@Entity('videos')
export class Video {
    @PrimaryColumn()
      video_id: string;

    @Column()
      title: string;

    @Column()
      description: string;

    /*
    @ManyToOne(() => User)
    @JoinColumn({ name: 'author_user' })
      user: User;
    */

    @Column()
      originalname: string;

    @Column()
      filename: string;

    @Column()
      size: number;

    @Column()
      author_id: string;

    @CreateDateColumn()
      created_at: Date;

    constructor() {
      if (!this.video_id) {
        this.video_id = uuid();
      }
    }
}
