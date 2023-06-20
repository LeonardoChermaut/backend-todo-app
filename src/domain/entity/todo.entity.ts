import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  constructor(todo?: Partial<TodoEntity>) {
    if (todo) {
      Object.assign(this, todo);
    }
  }

  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'task', type: 'varchar', length: 255 })
  task: string;

  @Column({ name: 'is_done', type: 'boolean', default: false })
  isDone: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
