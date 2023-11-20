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
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
