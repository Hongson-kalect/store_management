import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Item } from './Item';
import { ImExport } from './ImExport';
import { Cart } from './Cart';

@Entity({ name: 'item_infos' })
export class ItemInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  originalNumber: number;

  @Column({ type: 'float' })
  remain: number;

  @Column()
  productionDay: number;

  // time import is time on ImExport table

  @ManyToOne(() => ImExport, (imExport) => imExport.itemInfos)
  imPort: ImExport;

  @OneToMany(() => Cart, (cart) => cart.itemInfo)
  carts: Cart[];

  @ManyToOne(() => Item, (item) => item.itemInfos)
  item: Item;

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
