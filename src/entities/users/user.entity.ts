import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Unique } from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['firstName', 'lastName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
