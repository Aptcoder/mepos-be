import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from './store/store.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27018/mpos'),
    StoreModule,
    RoleModule,
  ],
})
export class AppModule {}
