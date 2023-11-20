import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { Food } from './Food';
import { ImExport } from './ImExport';
import { Item } from './Item';
import { Role } from './Role';
import { Room } from './Room';

@Entity({ name: 'buildings' })
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  describe: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  type: string;

  @OneToMany(() => Cart, (cart) => cart.building)
  carts: Cart[];

  @OneToMany(() => Food, (food) => food.building)
  foods: Food[];

  @OneToMany(() => ImExport, (imExport) => imExport.building)
  imExport: ImExport[];

  @OneToMany(() => Item, (item) => item.building)
  items: Item[];

  @OneToMany(() => Role, (role) => role.building)
  roles: Role[];

  @OneToMany(() => Room, (room) => room.building)
  rooms: Room[];

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
