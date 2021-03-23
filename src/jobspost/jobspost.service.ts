import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobsPostProps } from './jobspost.model';
import { Model } from 'mongoose'
import { PaidProps } from 'src/paid/paid.model';
import { removeDuplicate } from 'src/util/removeDuplicate';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import e from 'express';
import { link } from 'fs';
import { shuffleArray } from 'src/util/shuffleArray';
import { text } from 'body-parser';
@Injectable()
export class JobsPostService {
    constructor(@InjectModel('jobspost') private productModel: Model<JobsPostProps>) { }

    async insert(data: JobsPostProps) {
        const curDate = new Date(Date.now())
        const test = data.post_title.split('/')
        if(test.length > 1){
            data.post_id = test.join('-') + '-' + Math.floor(Math.random() * 1000000) + 1
        }
        // const splitSpaceTitle = data.post_title.replace(/\/\s/g, '-')
        const splitDate = curDate.toISOString().split('T')[0].split('-')
        if (splitDate[1] !== "0") {
            const date = new Date(splitDate["0"], splitDate["1"] - 1, splitDate["2"]).toDateString().split(' ')
            const newDate = date[2] + ' ' + date[1] + ' ' + date[3]
            data.post_date = newDate
        } else {
            const date = new Date(splitDate["0"], splitDate["1"], splitDate["2"]).toDateString().split(' ')
            const newDate = date[2] + ' ' + date[1] + ' ' + date[3]
            data.post_date = newDate
        }
        // data.post_id = splitSpaceTitle + '-' + Math.floor(Math.random() * 1000000) + 1
        data.createdDate = curDate
        data.updateDate = curDate
        const createdProduct = new this.productModel(data)
        createdProduct.save();
        return "Post Successful"
    }

    async findAll(req, res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number(params.limitPage || '30')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.productModel.countDocuments(filterObject);
        const totalPage = Math.ceil(totalDocument / limits);
        if (filterObject.all_province !== undefined || filterObject.all_works !== undefined) {
            const data = await this.productModel.find(filterObject).skip(skip).limit(limits).exec()
            const result = {
                data: data,
                totalDocument: totalDocument,
                pageNumber: pageNumber,
                totalPage: totalPage,
                message: "success"
            };
            return result
        } else if (filterObject.province !== undefined || filterObject.work_select !== undefined) {
            if (filterObject.province !== undefined && filterObject.work_select === undefined) {
                const provinceSplit = filterObject.province.split(',')
                const filterStore = {
                    work_type: {
                        $in: provinceSplit
                    }
                }
                const results = await this.productModel.find(filterStore).skip(skip).limit(limits).exec()
                const result = {
                    data: results,
                    totalDocument: totalDocument,
                    pageNumber: pageNumber,
                    totalPage: totalPage,
                    message: "success"
                };
                return result
            } else if (filterObject.province === undefined && filterObject.work_select !== undefined) {
                console.log('line84')
            } else {
                const provinceSplit = filterObject.province.split(',')
                const filterStore = {
                    province: {
                        $in: provinceSplit
                    },
                    work_select: {
                        $in: filterObject.work_select
                    }
                }
                const results = await this.productModel.find(filterStore).skip(skip).limit(limits).exec()
                const result = {
                    data: results,
                    totalDocument: totalDocument,
                    pageNumber: pageNumber,
                    totalPage: totalPage,
                    message: "success"
                };
                return result
            }

        } else {
            const results = await this.productModel.find(filterObject).skip(skip).limit(limits).exec()
            const result = {
                data: results,
                totalDocument: totalDocument,
                pageNumber: pageNumber,
                totalPage: totalPage,
                message: "success"
            };
            return result
        }

    }

    async findByUserID(req, res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number(params.limitPage || '30')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.productModel.countDocuments(filterObject);
        const totalPage = Math.ceil(totalDocument / limits);

        const data = await this.productModel.find(filterObject).skip(skip).limit(limits).exec()
        const result = {
            data: data,
            totalDocument: totalDocument,
            pageNumber: pageNumber,
            totalPage: totalPage,
            message: "success"
        };
        return result
    }

    async findAds(req, res) {
        const days = 7
        const adminAdslimits = 3
        const adsLimit = 6
        const getDateNow = new Date(Date.now())
        const startTime = 'T00:00:00.000Z'
        const endTime = 'T23:59:59.999Z'
        const splitDate = getDateNow.toISOString().split('T')
        const curDate = new Date(splitDate[0] + startTime)
        const endCurDate = new Date(splitDate[0] + endTime)
        var last7Days = new Date(curDate.getTime() - (days * 24 * 60 * 60 * 1000));
        const filterObject = {
            role: {
                $ne: '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do='
            },
        }
        const sortOrberBy = {
            createdDate: -1
        }

        const userData = await this.productModel.find(filterObject).sort(sortOrberBy).limit(adsLimit).exec()
        const result = {
            data: userData,
            message: "success"
        };
        return result
    }
    
    async findAdsAdmin(req,res){
        const adminAdslimits = 3
        const getDateNow = new Date(Date.now())
        const startTime = 'T00:00:00.000Z'
        const endTime = 'T23:59:59.999Z'
        const splitDate = getDateNow.toISOString().split('T')
        const curDate = new Date(splitDate[0] + startTime)
        const endCurDate = new Date(splitDate[0] + endTime)
        
        const sortOrberBy = {
            createdDate: -1
        }
        const filterCreatedDate = {
            role: '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do=', //'60002aac6168b58218542529',Admin id
            createdDate: {
                $lte: endCurDate
            }
        }

        const adminData = await this.productModel.find(filterCreatedDate).sort(sortOrberBy).limit(adminAdslimits).exec()
        const result = {
            data: adminData,
            message: "success"
        };
        return result
    }

    async findLatestCompanyRequired(req,res){
        const adminLimits = 3
        const limits = 7
        const AdminfilterObject = {
            role: {
                $eq: '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do='
            },
        }
        const filterObject = {
            role: {
                $ne: '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do='
            },
        }
        const adminCompanyData = await this.productModel.find(AdminfilterObject).limit(adminLimits).exec();
        const userCompanyData = await this.productModel.find(filterObject).limit(limits).exec();
        const mergeData = adminCompanyData.concat(userCompanyData).sort(()=>Math.random() - 0.5)
        const reduceData = mergeData.map(data=>{
            return {company_name:data.company_name,required_worker:data.required_worker}
        })
        return reduceData
    }
    async findById(id: string) {
        return await this.productModel.find({ _id: id }).exec();
    }

    async findPostById(id: string) {
        return await this.productModel.find({ post_id: id }).exec();
    }

    async updateById(id: string, data: JobsPostProps) {
        await this.productModel.findByIdAndUpdate(id, data).exec();
        return 'Update Successful.'
    }

    async deleteById(id: string) {
        await this.productModel.deleteOne({ _id: id }).exec();
        return 'Delete Successful.'
    }
    async updateData(id: string, data: JobsPostProps) {
        data.updateDate = new Date(Date.now())
    }
}
