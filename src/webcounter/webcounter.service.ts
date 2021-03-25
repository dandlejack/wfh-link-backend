import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WebCountersProps } from './webcounter.model';
import { Model } from 'mongoose'

@Injectable()
export class WebcounterService {
    constructor(@InjectModel('webcounters') private webCounterModel: Model<WebCountersProps>) { }

    async findHaveCurDate(req, res) {
        const curDate = new Date(Date.now()).toISOString().split('T')[0]
        const filterObject = {
            date: curDate
        }
        const results = await this.webCounterModel.find(filterObject).exec()
        return results
    }

    async incrementCount(oldData) {
        await this.webCounterModel.updateOne({ _id: oldData._id }, {
            $inc: { counter: 1 }
        })
    }

    async insert() {
        const curDate = new Date(Date.now())
        const curDateOnly = new Date(Date.now()).toISOString().split('T')[0]
        const data:WebCountersProps = {
            date : curDateOnly,
            counter : 1,
            createdDate:curDate,
            updateDate:curDate
        }
        const newCounter = new this.webCounterModel(data)
        const createdCounter = new this.webCounterModel(newCounter)
        return createdCounter.save();
    }

    async getVisitWeb(req,res){
        const limits = 7
        const sorted = {
            "createdDate": -1
        }
        const results = await this.webCounterModel.find().sort(sorted).limit(limits).exec()
        return results
    }
    async findAll(req,res){
        const limits = 7
        const sorted = {
            "createdDate": -1
        }
        const results = await this.webCounterModel.find().sort(sorted).limit(limits).exec()
        return results
    }
}
