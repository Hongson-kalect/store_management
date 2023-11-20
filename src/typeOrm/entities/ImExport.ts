import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Building } from './Building';
import {} from './Building';
import { ItemInfo } from './ItemInfo';
import { Role } from './Role';
import { Provider } from './Provider';

@Entity({ name: 'im_exports' })
export class ImExport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  time: number;

  @Column({ type: 'text' })
  quantitys: string;

  @Column({ type: 'text' })
  costs: string;

  @Column()
  type: string;

  @Column()
  isSuccess: boolean;

  @Column({ type: 'text' })
  describe: string;

  @ManyToOne(() => Provider, (provider) => provider.imExport)
  provider: Provider;

  @OneToMany(() => ItemInfo, (itemInfo) => itemInfo.id)
  itemInfos: ItemInfo[];

  @ManyToOne(() => Building, (building) => building.imExport)
  building: Building;

  @ManyToOne(() => Role, (role) => role.imExports)
  role: Role;

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
