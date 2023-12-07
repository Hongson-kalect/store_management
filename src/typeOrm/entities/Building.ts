import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Cart } from './Cart';
import { Food } from './Food';
import { ImExport } from './ImExport';
import { Item } from './Item';
import { Role } from './Role';
import { Room } from './Room';
import { Type } from './Type';
import { Fee } from './Fee';

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
  openTime: string; //Array to have different time depend on day [8:00-12:00,8:00-12:00,8:00-12:00,8:00-12:00,...] for open on all day of week, [8:00-12:00, 10:00-12:00, ..., close] for close on weekend

  @ManyToMany(() => Type, (type) => type.buildings)
  bussinessTypes: Type[];

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

  @OneToMany(() => Fee, (fee) => fee.building)
  fee: Fee[];

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
