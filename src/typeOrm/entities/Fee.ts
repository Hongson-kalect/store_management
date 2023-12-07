import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Building } from './Building';

@Entity({ name: 'fees' })
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  type: string; //Ngay, thang, hay nam

  @ManyToOne(() => Building, (building) => building.fee)
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
