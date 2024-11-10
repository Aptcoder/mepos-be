import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { StoreService } from 'src/store/store.service';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    private readonly storeService: StoreService
  ){}
  
  async create(createCustomerDto: CreateCustomerDto, storeId: string) {
    const store = await this.storeService.findOne(storeId);
    if (!store) throw new NotFoundException('Invalid Store!');

    const customerId = this.generateCustomersId();

    const customer = await this.customerModel.create({...createCustomerDto, store: storeId, customerId})
    return customer;
  }

  async findAll(storeId: string) {
    const customers = await this.customerModel.find({store: storeId})
    return customers;
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) throw new NotFoundException('Customer not found!');
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerModel.findByIdAndUpdate(id, {...updateCustomerDto}, {runValidators: true, new: true})
    if (!customer) throw new NotFoundException('Customer not found!');
    return customer ;
  }

  async remove(id: string) {
    await this.customerModel.deleteOne({_id: id});
    return;
  }

  generateCustomersId(): number {
    return Math.floor(10000000 + Math.random() * 90000000);
  }
}
