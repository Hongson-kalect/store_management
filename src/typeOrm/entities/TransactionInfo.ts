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
