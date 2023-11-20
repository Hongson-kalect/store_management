// import {
//   Entity,
//   Column,
//   OneToOne,
//   JoinColumn,
//   PrimaryGeneratedColumn,
//   OneToMany,
// } from 'typeorm';
// import { Profile } from './Profile';
// import { Record } from './Record';

// @Entity({ name: 'users' })
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   email: string;

//   @Column()
//   username: string;

//   @Column()
//   password: string;

//   @Column()
//   role: string;

//   @Column({ type: 'text' })
//   refreshToken: string;

//   @Column({ type: 'bigint' })
//   created_at: number;

//   @OneToOne(() => Profile)
//   @JoinColumn()
//   profile: Profile;

//   @OneToMany(() => Record, (record) => record.user)
//   record: Record;
// }
