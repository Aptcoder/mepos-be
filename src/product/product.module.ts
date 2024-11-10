import { Global, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CategoryService } from './category/category.service';
import { Category, CategorySchema } from './category/category.schema';
import { UnitService } from './unit/unit.service';
import { Unit, UnitSchema } from './unit/unit.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Unit.name, schema: UnitSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, CategoryService, UnitService],
  exports: [ProductService],
})
export class ProductModule {}
