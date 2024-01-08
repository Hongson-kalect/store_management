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
import { Device } from './typeOrm/entities/Device';
import { LoginHis } from './typeOrm/entities/LoginHis';
import { RequestHis } from './typeOrm/entities/RequestHis';
import { GuardJwtModule } from './modules/utils/guard/guard.jwt.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { InterCeptor } from './modules/utils/intercepters/intercepter';
import { HistoryRequestModule } from './modules/historyRequest/historyRequest.module';
import { InterCeptorModule } from './modules/utils/intercepters/intercepter.module';
import { BuildingModule } from './modules/building/building.module';
import { CartModule } from './modules/cart/cart.module';
import { ConfirmModule } from './modules/confirm/confirm.module';
import { DeviceModule } from './modules/device/device.module';
import { FeeModule } from './modules/fee/fee.module';
import { FoodModule } from './modules/food/food.module';
import { ImExportModule } from './modules/imExport/imExport.module';
import { ItemModule } from './modules/item/item.module';
import { ItemInfoModule } from './modules/itemInfo/itemInfo.module';
import { ItemPriceModule } from './modules/itemPrice/itemPrice.module';
import { LoginHistoryModule } from './modules/LoginHistory/loginHistory.module';
import { ProviderModule } from './modules/provider/provider.module';
import { RecordModule } from './modules/record/record.module';
import { RoleModule } from './modules/role/role.module';
import { RoomModule } from './modules/room/room.module';
import { RoomPriceModule } from './modules/roomPrice/roomPrice.module';
import { TimeKeepingModule } from './modules/timeKeeping/timeKeeping.module';
import { TransactionInfoModule } from './modules/transactionInfo/transactionInfo.module';
import { TransactionRecordModule } from './modules/transactionRecord/transactionRecord.module';
import { TypeModule } from './modules/type/type.module';
import { UserInfoModule } from './modules/userInfo/userInfo.module';

@Module({
  imports: [
    AuthModule,
    BuildingModule,
    CartModule,
    ConfirmModule,
    DeviceModule,
    FeeModule,
    FoodModule,
    HistoryRequestModule,
    ImExportModule,
    ItemModule,
    ItemInfoModule,
    ItemPriceModule,
    LoginHistoryModule,
    ProviderModule,
    RecordModule,
    RoleModule,
    RoomModule,
    RoomPriceModule,
    TimeKeepingModule,
    TransactionInfoModule,
    TransactionRecordModule,
    TypeModule,
    UserInfoModule,
    UserModules,

    GuardJwtModule,
    InterCeptorModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'store_management',
    //   entities: [
    //     Building,
    //     Cart,
    //     Confirm,
    //     Fee,
    //     Food,
    //     ImExport,
    //     Item,
    //     ItemInfo,
    //     ItemPrice,
    //     Provider,
    //     Record,
    //     Role,
    //     Room,
    //     RoomPrice,
    //     TimeKeeping,
    //     TransactionRecord,
    //     TransactionInfo,
    //     Type,
    //     User,
    //     UserInfo,
    //   ],
    //   synchronize: true,
    // }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
          Building,
          Cart,
          Confirm,
          Device,
          Fee,
          Food,
          ImExport,
          Item,
          ItemInfo,
          ItemPrice,
          LoginHis,
          Provider,
          Record,
          RequestHis,
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
        logging: true,
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: InterCeptor,
    },
  ],
})
export class AppModule {}
