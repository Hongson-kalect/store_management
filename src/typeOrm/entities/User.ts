import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { Record } from './Record';
import { Role } from './Role';
import { TransactionRecord } from './TransactionRecord';
import { UserInfo } from './UserInfo';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'text' })
  refreshToken: string;

  @OneToOne(() => UserInfo)
  @JoinColumn()
  profile: UserInfo;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];

  @OneToMany(() => TransactionRecord, (transaction) => transaction.user)
  transactions: TransactionRecord[];

  // @Column({ type: 'bigint' })
  // created_at: number;

  // @Column({ type: 'bigint' })
  // updatedAt: number;

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
