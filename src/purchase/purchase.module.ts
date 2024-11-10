import { Global, Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './schemas/purchase.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Purchase.name, schema: PurchaseSchema}
    ])
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
