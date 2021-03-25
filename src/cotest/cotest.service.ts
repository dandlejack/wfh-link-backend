import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose'
import { CoTestProps } from './cotest.model';
@Injectable()
export class CoTestService {
    constructor(@InjectModel('webcounters') private cotestModel: Model<CoTestProps>) { }
    async insert(data: CoTestProps) {
        const curDate = new Date(Date.now())
        data.createdDate = curDate
        data.updateDate = curDate
        const createdProduct = new this.cotestModel(data)
        createdProduct.save();
        return "Post Successful"
    }

    // async findAll(req, res) {
    //     const params = req.query
    //     const pageNumber = Number(params.pageNumber || "1");
    //     const limits = Number(params.limitPage || '4')
    //     const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
    //     const skip = (pageNumber - 1) * limits;
    //     const totalDocument = await this.cotestModel.countDocuments(filterObject);
    //     const totalPage = Math.ceil(totalDocument / limits);
    //     const results = await this.cotestModel.find(filterObject).sort({ 'topten_date': -1 }).skip(skip).limit(limits).exec()
    //     const result = {
    //         data: results,
    //         totalDocument: totalDocument,
    //         pageNumber: pageNumber,
    //         totalPage: totalPage,
    //         message: "success"
    //     };
    //     return result
    // }
    async findLatestDate(req, res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number('1')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.cotestModel.countDocuments(filterObject);
        const results = await this.cotestModel.find({ "hightest_all": false }).sort({ "topten_date": -1 }).limit(limits).exec()
        const totalPage = Math.ceil(totalDocument / limits);
        return results
    }

    async findById(id: string) {
        return await this.cotestModel.find({ topten_id: id }).exec();
    }

    async findMax(req, res) {
        const storeResult = []
        var project ={$project:{"list_data.reward":1, "list_data.lucky_name":1}}
        var unwind = {$unwind:"$list_data"}
        var sort = { $sort: { "list_data.reward": -1 } }
        var limit = { $limit: 10 }
        const result = await this.cotestModel.aggregate([project,unwind,sort,limit])
        result.map(data=>{
            storeResult.push(data.list_data)
        })
        return storeResult
    }
    async findAll(req,res){
        const limits = 7
        const sorted = {
            "createdDate": 1
        }
        const results = await this.cotestModel.find().sort(sorted).limit(limits).exec()
        return results
    }
}
