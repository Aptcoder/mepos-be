import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permission } from 'src/common/guards/permission.helper';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto) {
    const data = await this.storeService.create(createStoreDto);
    return HttpResponseHelper.send('Store created', data);
  }

  @Permission('user-create')
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const stores = await this.storeService.findAll();
    return HttpResponseHelper.send('Stores', stores);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const store = await this.storeService.findOne(id);
    return HttpResponseHelper.send('Store', store);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
