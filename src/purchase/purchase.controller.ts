import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csvtojson from 'csvtojson';

import { HttpResponseHelper } from 'src/common/helper/http-response.helper';

@Controller(':storeId/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('productFile'))
  async create(
    @Param('storeId') storeId:string,
    @Body() createPurchaseDto: CreatePurchaseDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    productFile: Express.Multer.File
  ) {  
    const productFileJSON = await csvtojson().fromString(productFile.buffer.toString());
    const purchase = await this.purchaseService.create(storeId, createPurchaseDto, productFileJSON);
    return HttpResponseHelper.send('Purchase created', purchase)
  }

  @Get()
  async findAll(@Param('storeId') storeId:string) {
    const purchases = await this.purchaseService.findAll(storeId);
    return HttpResponseHelper.send('Purchases', purchases)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
