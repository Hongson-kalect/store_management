import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './User';
import { Building } from './Building';

@Entity({ name: 'confirm' })
export class Confirm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  value: string;

  @Column({ type: 'text', nullable: true })
  information: string;

  @Column({ default: false })
  isConfirm: boolean;

  @Column()
  email: string;

  @ManyToOne(() => User, (building) => building.id)
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

  // insertCreated() {
  //   this.created_at = new Date();
  //   this.updated_at = new Date();
  // }

  // @BeforeUpdate()
  // insertUpdated() {
  //   this.updated_at = new Date();
  // }
}
