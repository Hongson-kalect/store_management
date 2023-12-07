import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Building } from './Building';
import { ItemInfo } from './ItemInfo';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ default: false })
  isConfirm: boolean;

  @Column()
  state: string; //added | confirmed | deliverying | finished | failed | canceled

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => ItemInfo, (item) => item.carts)
  itemInfo: ItemInfo;

  @ManyToOne(() => Building, (building) => building.carts)
  building: Building;

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
}
