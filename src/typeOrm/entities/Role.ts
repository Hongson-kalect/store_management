import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImExport } from './ImExport';
import { User } from './User';
import { Building } from './Building';
import { TimeKeeping } from './TimeKeeping';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  wageType: string;

  @Column()
  baseWage: string;

  @Column()
  asurance: string;

  @Column()
  vihicleBonus: number;

  @Column()
  diligenceBonus: string;

  @Column()
  ortherBonus: number;

  @Column()
  discount: number;

  @Column()
  describe: string; //Exlain why have OrtherBonus Or (And) Discount

  @OneToMany(() => ImExport, (item) => item.role)
  imExports: ImExport[];

  @OneToMany(() => TimeKeeping, (time) => time.role)
  timeKeepings: TimeKeeping[];

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @ManyToOne(() => Building, (building) => building.roles)
  building: Building;

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
