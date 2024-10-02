import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';

@Controller('/:storeId/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto, @Param('storeId') storeId: string) {
    const data = await this.customersService.create(createCustomerDto, storeId);
    return HttpResponseHelper.send('Customer created', data);
  }

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    const data =  await this.customersService.findAll(storeId);
    return HttpResponseHelper.send('Customers', data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, ) {
    const data = await this.customersService.findOne(id);
    return HttpResponseHelper.send('Customer', data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const data = await this.customersService.update(id, updateCustomerDto);
    return HttpResponseHelper.send('Customer updated', {});
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.customersService.remove(id);
    return HttpResponseHelper.send('Customer deleted', {});
  }
}
