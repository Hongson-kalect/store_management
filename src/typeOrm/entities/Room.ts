import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Record } from './Record';
import { Building } from './Building';
import { RoomPrice } from './RoomPrice';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  inUse: boolean;

  @Column({ nullable: true })
  phone: string; //on secnerio that every rOom on building have it Own fixed phone

  @Column()
  isShowInfo: boolean;

  @Column()
  type: string;

  @Column()
  desribe: string;

  @Column({ type: 'text' })
  image: string;

  @ManyToOne(() => RoomPrice, (roomPrice) => roomPrice.room)
  roomPrices: RoomPrice[];

  @OneToMany(() => Record, (record) => record.room)
  records: Record[];

  @ManyToOne(() => Building, (building) => building.rooms)
  building: Building;

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
