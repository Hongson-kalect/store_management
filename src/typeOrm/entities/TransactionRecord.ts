import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionInfo } from './TransactionInfo';
import { User } from './User';

@Entity({ name: 'transaction_records' })
export class TransactionRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isSuccess: boolean;

  @OneToMany(() => TransactionInfo, (info) => info.transactionRecord)
  transactionInfos: TransactionInfo[];

  @ManyToOne(() => User, (user) => user.transactions)
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
