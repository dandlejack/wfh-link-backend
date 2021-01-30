import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReceivedProps } from './received.model';
import {Model} from 'mongoose'
@Injectable()
export class ReceivedService {
    constructor(@InjectModel('received') private receivedModel: Model<ReceivedProps>) { }

    async insert(data:ReceivedProps) {        
        const curDate = new Date(Date.now())
        data.createdDate = curDate
        data.updateDate = curDate
        const newReceivedInvoice = new this.receivedModel(data)
        const createdReceivedInvoice = new this.receivedModel(newReceivedInvoice)
        return createdReceivedInvoice.save();
    }

    async findAll(req,res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number(params.limitPage || '20')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.receivedModel.countDocuments(filterObject);
        const totalPage = Math.ceil(totalDocument / limits);
        const data = await this.receivedModel.find(filterObject).skip(skip).limit(limits).exec()
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
        return await this.receivedModel.find({_id:id}).exec();
    }

    async updateById(id: string, data: ReceivedProps) {
        data.updateDate = new Date(Date.now())
        await this.receivedModel.findByIdAndUpdate(id,data).exec();
        return 'Update Successful.'
    }

    async deleteById(id: string) {
        await this.receivedModel.deleteOne({_id:id}).exec();
        return 'Delete Successful.'
    }
}
