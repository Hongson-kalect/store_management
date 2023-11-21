import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModules } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { Building } from './typeOrm/entities/Building';
import { Cart } from './typeOrm/entities/Cart';
import { Confirm } from './typeOrm/entities/Confirm';
import { Fee } from './typeOrm/entities/Fee';
import { Food } from './typeOrm/entities/Food';
import { ImExport } from './typeOrm/entities/ImExport';
import { Item } from './typeOrm/entities/Item';
import { ItemInfo } from './typeOrm/entities/ItemInfo';
import { ItemPrice } from './typeOrm/entities/ItemPrice';
import { Provider } from './typeOrm/entities/Provider';
import { Record } from './typeOrm/entities/Record';
import { Role } from './typeOrm/entities/Role';
import { Room } from './typeOrm/entities/Room';
import { RoomPrice } from './typeOrm/entities/RoomPrice';
import { TimeKeeping } from './typeOrm/entities/TimeKeeping';
import { TransactionRecord } from './typeOrm/entities/TransactionRecord';
import { User } from './typeOrm/entities/User';
import { UserInfo } from './typeOrm/entities/UserInfo';
import { TransactionInfo } from './typeOrm/entities/TransactionInfo';
import { Type } from './typeOrm/entities/Type';

@Module({
  imports: [
    UserModules,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'store_management',
      entities: [
        Building,
        Cart,
        Confirm,
        Fee,
        Food,
        ImExport,
        Item,
        ItemInfo,
        ItemPrice,
        Provider,
        Record,
        Role,
        Room,
        RoomPrice,
        TimeKeeping,
        TransactionRecord,
        TransactionInfo,
        Type,
        User,
        UserInfo,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
