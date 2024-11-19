import { Global, Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { StoreModule } from 'src/store/store.module';

@Global()
@Module({
  imports: [
    StoreModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
