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
import { LoginHis } from './LoginHis';
import { RequestHis } from './RequestHis';
import { Device } from './Device';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  token: string;

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

  @OneToMany(() => LoginHis, (loginHis) => loginHis.user)
  loginHis: LoginHis[];

  @OneToMany(() => RequestHis, (requestHis) => requestHis.user)
  requestHis: RequestHis[];

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  // @Column({ type: 'bigint' })
  // created_at: number;

  // @Column({ type: 'bigint' })
  // updatedAt: number;

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

  // @BeforeInsert()
  // insertCreated() {
  //   this.created_at = new Date();
  //   this.updated_at = new Date();
  // }

  // @BeforeUpdate()
  // insertUpdated() {
  //   this.updated_at = new Date();
  // }
}
