import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyModule } from './verify/verify.module';
import { MapModule } from './map/map.module';
import { ShowingModule } from './showing/showing.module';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/users', {}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    VerifyModule,
    MapModule,
    ShowingModule,
    BuyerModule,
    SellerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
