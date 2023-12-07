import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'request_his' })
export class RequestHis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '/' })
  url: string;

  @Column({ type: 'text' })
  params: string;

  @Column({ default: false })
  isSucess: boolean;

  @Column({ nullable: true })
  decribe: string;

  @ManyToOne(() => User, (user) => user.loginHis)
  user: User;

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
