import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose'
import { TopTenProps } from './topten.model';
@Injectable()
export class ToptenService {
    constructor(@InjectModel('toptens') private toptenModel: Model<TopTenProps>) { }
    async insert(data: TopTenProps) {
        const curDate = new Date(Date.now())
        data.createdDate = curDate
        data.updateDate = curDate
        data.topten_id = 'b' + Math.floor(Math.random() * 1000000) + 1
        const createdProduct = new this.toptenModel(data)
        createdProduct.save();
        return "Post Successful"
    }

    async findAll(req, res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number(params.limitPage || '4')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.toptenModel.countDocuments(filterObject);
        const totalPage = Math.ceil(totalDocument / limits);
        const results = await this.toptenModel.find(filterObject).sort({ 'topten_date': -1 }).skip(skip).limit(limits).exec()
        const result = {
            data: results,
            totalDocument: totalDocument,
            pageNumber: pageNumber,
            totalPage: totalPage,
            message: "success"
        };
        return result
    }
    async findLatestDate(req, res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number('1')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.toptenModel.countDocuments(filterObject);
        const results = await this.toptenModel.find({ "hightest_all": false }).sort({ "topten_date": -1 }).limit(limits).exec()
        const totalPage = Math.ceil(totalDocument / limits);
        return results
    }

    async findById(id: string) {
        return await this.toptenModel.find({ topten_id: id }).exec();
    }

    async findMax(req, res) {
        const storeResult = []
        var project ={$project:{"list_data.reward":1, "list_data.lucky_name":1}}
        var unwind = {$unwind:"$list_data"}
        var sort = { $sort: { "list_data.reward": -1 } }
        var limit = { $limit: 10 }
        const result = await this.toptenModel.aggregate([project,unwind,sort,limit])
        result.map(data=>{
            storeResult.push(data.list_data)
        })
        return storeResult
    }
}
