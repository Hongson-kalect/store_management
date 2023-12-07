import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Food } from './Food';
import { TransactionRecord } from './TransactionRecord';

@Entity({ name: 'transaction_infos' })
export class TransactionInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Food)
  @JoinColumn()
  food: Food;

  @Column()
  quantity: number;

  @ManyToOne(() => TransactionRecord, (tran) => tran.transactionInfos)
  transactionRecord: TransactionRecord;

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
