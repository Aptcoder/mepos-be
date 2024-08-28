import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MEPOS_DB),
    StoreModule,
    RoleModule,
    ProductModule,
    TransactionModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}