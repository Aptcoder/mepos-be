import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './category/dto/create-category.dto';
import { CategoryService } from './category/category.service';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';
import { UnitService } from './unit/category.service';
import { CreateUnitDto } from './unit/dto/create-unit.dto';

@Controller('/:storeId/products')
export class ProductController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly unitService: UnitService,
  ) {}

  @Post('/categories')
  async createCategory(
    @Param('storeId') storeId: string,
    @Body() createCateDto: CreateCategoryDto,
  ) {
    const category = await this.categoryService.create(storeId, createCateDto);
    return HttpResponseHelper.send('Category created', category);
  }

  @Post('/units')
  async createUnit(
    @Param('storeId') storeId: string,
    @Body() createUnitDto: CreateUnitDto,
  ) {
    const unit = await this.unitService.create(storeId, createUnitDto);
    return HttpResponseHelper.send('Unit created', unit);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productService.create(storeId, createProductDto);
    return HttpResponseHelper.send('Product created', product);
  }

  @Get('/categories')
  async fetchCategories(@Param('storeId') storeId: string) {
    const categories = await this.categoryService.findAll(storeId);
    return HttpResponseHelper.send('Categories', categories);
  }

  @Get('/units')
  async fetchUnits(@Param('storeId') storeId: string) {
    const units = await this.unitService.findAll(storeId);
    return HttpResponseHelper.send('Units', units);
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return HttpResponseHelper.send('Products', products);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
