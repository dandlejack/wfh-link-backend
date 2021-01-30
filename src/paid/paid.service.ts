import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { PaidProps } from './paid.model';
@Injectable()
export class PaidService {
    constructor(@InjectModel('paid') private paidModel: Model<PaidProps>) { }

    async insert(data:PaidProps) {        
        const curDate = new Date(Date.now())
        data.createdDate = curDate
        data.updateDate = curDate
        const newCustomer = new this.paidModel(data)
        const createdCustomer = new this.paidModel(newCustomer)
        return createdCustomer.save();
    }

    async findAll(req,res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number(params.limitPage || '20')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.paidModel.countDocuments(filterObject);
        const totalPage = Math.ceil(totalDocument / limits);
        const data = await this.paidModel.find(filterObject).skip(skip).limit(limits).exec()
        const result = {
            data: data,
            totalDocument: totalDocument,
            pageNumber: pageNumber,
            totalPage: totalPage,
            message: "success"
            };
        return result
    }
    
    async findById(id: string) {
        return await this.paidModel.find({_id:id}).exec();
    }

    async updateById(id: string, data: PaidProps) {
        data.updateDate = new Date(Date.now())
        await this.paidModel.findByIdAndUpdate(id,data).exec();
        return 'Update Successful.'
    }

    async deleteById(id: string) {
        await this.paidModel.deleteOne({_id:id}).exec();
        return 'Delete Successful.'
    }
}
