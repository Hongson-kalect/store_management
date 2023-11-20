import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './Item';
import { ImExport } from './ImExport';

@Entity({ name: 'item_infos' })
export class ItemInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  remain: number;

  @Column()
  productionDay: number;

  // time import is time on ImExport table

  @ManyToOne(() => ImExport, (imExport) => imExport.itemInfos)
  imPort: ImExport;

  @ManyToOne(() => Item, (item) => item.itemInfos)
  item: Item;

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
