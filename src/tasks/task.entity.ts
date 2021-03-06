import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  title: String;
  @Column()
  description: String;
  @Column()
  status: TaskStatus

}

