import { LoggerModule } from 'nestjs-pino';
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
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { MailModule } from './mail/mail.module';
import { CustomersModule } from './customers/customers.module';
import { PurchaseModule } from './purchase/purchase.module';
import { AccountModule } from './account/account.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/translation/locales/'),
        watch: true,
      },
      viewEngine: 'hbs',
      resolvers: [{ use: QueryResolver, options: ['lang'] }],
    }),
    MailModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MEPOS_DB),
    StoreModule,
    RoleModule,
    ProductModule,
    TransactionModule,
    CustomersModule,
    AccountModule,
    PurchaseModule,
    ExpenseModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
