import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@Entity({ name: 'record' })
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timeIn: number;

  @Column()
  timeOut: number;

  @Column()
  IsPay: boolean;

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @Column()
  discount: string;

  @ManyToOne(() => Room, (room) => room.records)
  room: Room;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
