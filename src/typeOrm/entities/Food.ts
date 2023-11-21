import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Building } from './Building';
import { Type } from './Type';

@Entity({ name: 'foods' })
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rollNo: string;

  @Column({ type: 'text' })
  describe: string;

  @Column()
  price: string;

  @Column({ type: 'text' })
  image: string;

  @Column()
  discount: string;

  @Column()
  tag: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Building, (building) => building.foods)
  building: Building;

  @ManyToMany(() => Type, (type) => type.foods)
  foodTypes: Type[];

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
