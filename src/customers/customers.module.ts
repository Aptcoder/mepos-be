import { Global, Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([
    {name: Customer.name, schema: CustomerSchema}
  ])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomersModule {}
