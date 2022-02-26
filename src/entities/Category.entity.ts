import {
  Entity, Column, CreateDateColumn, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('categories')
export class Category {
    @PrimaryColumn()
      category_id: string;

    @Column()
      category_name: string;

    @Column()
      category_description: string;

    @CreateDateColumn()
      created_at: Date;

    constructor() {
      if (!this.category_id) {
        this.category_id = uuid();
      }
    }
}
