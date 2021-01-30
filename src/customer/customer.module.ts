import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerSchema } from './customer.model';
import {MongooseModule} from '@nestjs/mongoose'
@Module({
  imports : [MongooseModule.forFeature([{ name: 'customers', schema: CustomerSchema }], 'customer')],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
