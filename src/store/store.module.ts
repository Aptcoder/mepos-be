import { Module, Global } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './store.schema';
import { UserService } from 'src/user/user.service';
import { RoleModule } from 'src/role/role.module';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    UserModule,
    RoleModule,
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StoreController],
  providers: [StoreService, UserService],
  exports: [StoreService]
})
export class StoreModule {}
