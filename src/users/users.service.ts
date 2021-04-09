import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersProps } from './users.model';
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt';
import { generateReferralId } from 'src/util/shuffleArray';
import * as macaddress from 'macaddress'
import * as ReqIpAddress from 'request-ip'

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
        console.log(refID)
        const t = ReqIpAddress.getClientIp(req)
        console.log(t)
        const data = await this.userModel.find({ myReferral: refID })
        const getMacAddress = await macaddress.one().then(res => {
            console.log(res)
            return res
        })
        return t
    }
}
