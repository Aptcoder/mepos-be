import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import * as csvtojson from 'csvtojson';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './category/dto/create-category.dto';
import { CategoryService } from './category/category.service';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';
import { UnitService } from './unit/unit.service';
import { CreateUnitDto } from './unit/dto/create-unit.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

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

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductSheet(
    @Param('storeId') storeId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const json = await csvtojson().fromString(file.buffer.toString());
    const products = await this.productService.createBatch(storeId, json);
    return HttpResponseHelper.send('Products uploaded', products);
  }

  @Get('/categories')
  async fetchCategories(@Param('storeId') storeId: string) {
    const categories = await this.categoryService.findAll(storeId);
    return HttpResponseHelper.send('Categories', categories);
  }

  @Delete('/categories/:id')
  async deleteCategory(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    await this.categoryService.remove(id);
    return HttpResponseHelper.send('Category deleted', {});
  }

  @Get('/units')
  async fetchUnits(@Param('storeId') storeId: string) {
    const units = await this.unitService.findAll(storeId);
    return HttpResponseHelper.send('Units', units);
  }

  @Get()
  async findAll(
    @Param('storeId') storeId: string,
    @Query('name') name?: string,
  ) {
    const products = await this.productService.findAll(storeId, name);
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
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
    return HttpResponseHelper.send('Product deleted', {});
  }
}
