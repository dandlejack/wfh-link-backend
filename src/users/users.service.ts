import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersProps } from './users.model';
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt';
import { generateReferralId } from 'src/util/shuffleArray';
import * as macaddress from 'macaddress'
import * as ReqIpAddress from 'request-ip'
import e from 'express';

@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private userModel: Model<UsersProps>) { }



    async findAll(req, res) {

    }

    async findUsersAds(req, res) {
        const limits = 10
        const sortOrberBy = {
            createdDate: -1
        }
        const filterObject = {
            role: {
                $ne: '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do='
            },
        }
        const userData = await this.userModel.find(filterObject).sort(sortOrberBy).limit(limits).exec()
        const result = userData.map((data: any) => {
            return {
                firstname: data.firstname,
                telNumber: data.telNumber
            }
        })
        return result
    }

    async insert(data: UsersProps) {
        const checkUser = await this.userModel.findOne({ email: data.email })
        if (checkUser === null) {
            const curDate = new Date(Date.now())
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            const getReferral = generateReferralId(9)
            data.createdDate = curDate
            data.updateDate = curDate
            data.password = hash
            data.myReferral = getReferral
            const newUser = new this.userModel(data)
            const createdNewUser = new this.userModel(newUser)
            createdNewUser.save();
            const result = {
                success: true,
                data: 'successful'
            }
            return result
        } else {
            const result = {
                success: false,
                data: 'มีอีเมล์ใช้งานนี้อยู่แล้ว'
            }
            return result
        }

    }

    async findById(id: string) {
        return await this.userModel.find({ _id: id }).exec();
    }

    async updateById(id: string, data: UsersProps) {

    }

    async deleteById(id: string) {

    }

    async findByReferralID(refID: string, req) {
        const data = await this.userModel.find({ myReferral: refID })
        const result = {
            myReferral : data[0].myReferral,
            clickRefCounter:data[0].clickRefCounter
        }
        return result
    }

    async counterByReferralID(refID: string, req) {
        const getCurrentClientIp = ReqIpAddress.getClientIp(req)
        const data = await this.userModel.find({ myReferral: refID })
        const IpTimeSet = {
            ip: getCurrentClientIp,
            dateTime: Date.now()
        }
        console.log(refID)
        const checkIp = data[0].lastestIpFromReferral.find(d => d.ip === getCurrentClientIp)

        if (checkIp) {
            const dateNow = Date.now()
            const checkMoreThanHour = ((dateNow - checkIp.dateTime) / 3600000) // 3600000 = 1000*60*60  millisec to sec divided 1000 => sec to min divided 60 => min to hr divided 60
            if (checkMoreThanHour >= 1) {
                data[0].lastestIpFromReferral.map(data => {
                    if (data.ip === getCurrentClientIp) data.dateTime = dateNow
                })
                await this.userModel.update({ myReferral: refID }, { $set: { lastestIpFromReferral: data[0].lastestIpFromReferral }})
                await this.userModel.update({ myReferral: refID }, { $inc: { clickRefCounter: 1 }})
            }
        } else {
            data[0].lastestIpFromReferral.push(IpTimeSet)
            await this.userModel.updateOne({ myReferral: refID }, { $set: { lastestIpFromReferral: data[0].lastestIpFromReferral }, $inc: { clickRefCounter: 1 } })
        }
        return 'success'
    }
}
