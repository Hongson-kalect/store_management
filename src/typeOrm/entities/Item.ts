import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { Building } from './Building';
import { ItemInfo } from './ItemInfo';
import { ItemPrice } from './ItemPrice';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rollNo: string;

  @Column()
  name: string;

  @Column()
  expiredIn: number; //month

  @Column()
  unit: string;

  @Column()
  describe: string;

  @ManyToOne(() => Building, (building) => building.items)
  building: Building;

  @OneToMany(() => Cart, (cart) => cart.item)
  carts: Cart[];

  @OneToMany(() => ItemInfo, (itemInfo) => itemInfo.item)
  itemInfos: ItemInfo[];

  @OneToMany(() => ItemPrice, (itemPrice) => itemPrice.item)
  itemPrices: ItemPrice[];

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
