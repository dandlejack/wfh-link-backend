import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerProps,CustomerSchema, CustomerDocument,Customer } from './customer.model';
import { Model } from 'mongoose'

@Injectable()
export class CustomerService {
    constructor(@InjectModel('customers') private customerModel: Model<CustomerProps>) { }

    async insert(customerName: string) {
        const curDate = Date.now()
        const newCustomer = new this.customerModel({customer_name:customerName,createdDate:curDate,updateDate:curDate})        
        const checkCustomer = await this.customerModel.find({customer_name:customerName}).exec();
        if(checkCustomer.length > 0 ){
            return "Customer with already exists."
        }
        const createdCustomer = new this.customerModel(newCustomer)
        return createdCustomer.save();
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerModel.find().exec();
    }


    async findById(id: string) {
        return await this.customerModel.find({_id:id}).exec();
    }

    async updateById(id: string, data: CustomerProps) {
        data.updateDate = new Date(Date.now())
        await this.customerModel.findByIdAndUpdate(id,data).exec();
        return 'Update Successful.'
    }

    async deleteById(id: string) {
        await this.customerModel.deleteOne({_id:id}).exec();
        return 'Delete Successful.'
    }
}
