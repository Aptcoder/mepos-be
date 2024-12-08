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
import { UpdateUnitDto } from './unit/dto/update-unit.dto';
import { UpdateCategoryDto } from './category/dto/update-category.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('/:storeId/products')
export class ProductController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly unitService: UnitService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post('/categories')
  async createCategory(
    @Param('storeId') storeId: string,
    @Body() createCateDto: CreateCategoryDto,
  ) {
    const category = await this.categoryService.create(storeId, createCateDto);
    return HttpResponseHelper.send('Category created', category);
  }

  @Get('/categories/:id')
  async fetchCategory(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    const category = await this.categoryService.findOne(storeId, id);
    return HttpResponseHelper.send('Category', category);
  }

  @Delete('/categories/:id')
  async deleteCategory(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    await this.categoryService.remove(storeId, id);
    return HttpResponseHelper.send('Category deleted', {});
  }

  @Patch('/categories/:id')
  async updateCategory(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(
      storeId,
      id,
      updateCategoryDto,
    );
    return HttpResponseHelper.send('Category updated', category);
  }

  @Get('/categories')
  async fetchCategories(@Param('storeId') storeId: string) {
    const categories = await this.categoryService.findAll(storeId);
    return HttpResponseHelper.send('Categories', categories);
  }

  @Post('/units')
  async createUnit(
    @Param('storeId') storeId: string,
    @Body() createUnitDto: CreateUnitDto,
  ) {
    const unit = await this.unitService.create(storeId, createUnitDto);
    return HttpResponseHelper.send('Unit created', unit);
  }

  @Get('/units/:id')
  async fetchUnit(@Param('storeId') storeId: string, @Param('id') id: string) {
    const unit = await this.unitService.findOne(storeId, id);
    return HttpResponseHelper.send('Unit fetched', unit);
  }

  @Get('/units')
  async fetchUnits(@Param('storeId') storeId: string) {
    const units = await this.unitService.findAll(storeId);
    return HttpResponseHelper.send('Units', units);
  }

  @Patch('/units/:id')
  async updateUnit(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    const unit = await this.unitService.update(storeId, id, updateUnitDto);
    return HttpResponseHelper.send('Unit updated', unit);
  }

  @Delete('/units/:id')
  async deleteUnit(@Param('storeId') storeId: string, @Param('id') id: string) {
    await this.unitService.remove(storeId, id);
    return HttpResponseHelper.send('Unit deleted', {});
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

  @Get()
  async findAll(
    @Param('storeId') storeId: string,
    @Query('name') name?: string,
  ) {
    const products = await this.productService.findAll(storeId, name);
    return HttpResponseHelper.send('Products', products);
  }

  @Get(':id')
  async findOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    const product = await this.productService.findOne(storeId, id);
    return HttpResponseHelper.send('Product', product);
  }

  @Patch(':id')
  async update(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.update(storeId, id, updateProductDto);
    return HttpResponseHelper.send('Product updated', {});
  }

  @Delete(':id')
  async remove(@Param('storeId') storeId: string, @Param('id') id: string) {
    await this.productService.remove(storeId, id);
    return HttpResponseHelper.send('Product deleted', {});
  }

  @Patch(':id/upload-product-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @UploadedFile()
      image: Express.Multer.File,
  ) {
    const productImage = await this.cloudinaryService.uploadFile(image);
    const product = await this.productService.update(storeId, id, {productImage: productImage.secure_url});
    return HttpResponseHelper.send('Product image uploaded', product);
  }
}
