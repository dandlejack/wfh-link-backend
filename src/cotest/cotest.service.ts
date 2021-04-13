import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose'
import { CoTestProps } from './cotest.model';
@Injectable()
export class CoTestService {
    constructor(@InjectModel('webcounters') private cotestModel: Model<CoTestProps>) { }
    async findHaveCurDate(req, res) {
        const curDate = new Date(Date.now()).toISOString().split('T')[0]
        const filterObject = {
            date: curDate
        }
        const results = await this.cotestModel.find(filterObject).exec()
        return results
    }

    async incrementCount(oldData) {
        await this.cotestModel.updateOne({ _id: oldData._id }, {
            $inc: { counter: 1 }
        })
    }

    async insert() {
        const curDate = new Date(Date.now())
        const curDateOnly = new Date(Date.now()).toISOString().split('T')[0]
        const data: CoTestProps = {
            date: curDateOnly,
            counter: 1,
            createdDate: curDate,
            updateDate: curDate
        }
        const newCounter = new this.cotestModel(data)
        const createdCounter = new this.cotestModel(newCounter)
        return createdCounter.save();
    }
    async findAll(req, res) {
        const limits = 7
        const d = new Date();
        d.setDate(d.getDate() - 7)
        const sorted = {
            "createdDate": 1
        }
        // const results = await this.cotestModel.find().limit(limits).exec()
        const results = await this.cotestModel.aggregate([{ $match: { 'createdDate': { $gt: d } } }])
        return results
    }
}
