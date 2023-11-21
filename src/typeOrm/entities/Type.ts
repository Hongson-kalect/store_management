import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Building } from './Building';
import { Item } from './Item';
import { Food } from './Food';

@Entity({ name: 'types' })
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  describe: string;

  @ManyToMany(() => Building, (building) => building.bussinessTypes)
  @JoinTable({ name: 'buildings_types' })
  buildings: Building[];

  @ManyToMany(() => Item, (item) => item.itemTypes)
  @JoinTable({ name: 'items_types' })
  items: Item[];

  @ManyToMany(() => Food, (food) => food.foodTypes)
  @JoinTable({ name: 'foods_types' })
  foods: Food[];

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
