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

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ default: '0' })
  discount: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ default: 0 })
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
