import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'task', type: 'varchar', length: 255 })
  task: string;

  @Column({ name: 'is_done', type: 'tinyint', width: 1 })
  isDone: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
