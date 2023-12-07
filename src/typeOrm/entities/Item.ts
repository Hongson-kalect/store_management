import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Building } from './Building';
import { ItemInfo } from './ItemInfo';
import { ItemPrice } from './ItemPrice';
import { Type } from './Type';

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

  @OneToMany(() => ItemInfo, (itemInfo) => itemInfo.item)
  itemInfos: ItemInfo[];

  @OneToMany(() => ItemPrice, (itemPrice) => itemPrice.item)
  itemPrices: ItemPrice[];

  @ManyToMany(() => Type, (type) => type.items)
  itemTypes: Type[];

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
