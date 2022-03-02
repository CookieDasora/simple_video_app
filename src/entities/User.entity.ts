import {
  Entity, Column, CreateDateColumn, PrimaryColumn, OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Video } from './Video.entity';

@Entity('users')
export class User {
    @PrimaryColumn()
      id: string;

    @Column()
      username: string;

    @Column()
      email: string;

    @Column()
      password: string;

    @OneToMany(() => Video, (video) => video.author)
      videos: Video[];

    @CreateDateColumn()
      created_at: Date;

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}
