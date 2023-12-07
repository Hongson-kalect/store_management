import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './Role';

@Entity({ name: 'time_keeping' })
export class TimeKeeping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: number; //timestamp Off day start: like timestamp Of 00:00:00 Of 19/10/2013

  @Column({ type: 'float' })
  bonus: number;

  @Column({ type: 'float' })
  onTime: number;

  @Column({ type: 'float' })
  overTime: number;

  @Column()
  shift: string;

  @Column()
  describe: string;

  @ManyToOne(() => Role, (role) => role.timeKeepings)
  role: Role;

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
