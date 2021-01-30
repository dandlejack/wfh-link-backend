import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { UserController } from 'src/users/users.controller';
import { Model } from 'mongoose'
import { AuthProps } from './auth.model';
import { UsersService } from 'src/users/users.service';
import { UsersProps } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<UsersProps>,private jwtService: JwtService) { }
  async login(req, res) {
    const result = await this.validateUser(req.body.email, req.body.password)
    console.log(result)
    if(result !== null){
      if(result.checking)
      return res.send({
        token: this.createToken(result),
        user: result
      });
    }else{
      res.send({msg:'email or password wrong'})
    }
  }

  createToken(data) {
    const payload = {
      _id: data._id,
      firstname:data.firstname,
      email:data.email,
      role:data.role
    };
    return this.jwtService.sign(payload)    
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: username }).exec()
    if(user){
      const comparePass = await bcrypt.compare(pass, user.password)
      if (user && comparePass) {
        const { password, ...result } = user;
        const data = {
          _id:user._id,
          firstname:user.firstname,
          email:user.email,
          role:user.role,
          checking:true
        }
        return data;
      }
    }
    
    return null;
  }

  async insert(data: UsersProps) {
    const curDate = new Date(Date.now())
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    data.createdDate = curDate
    data.updateDate = curDate
    data.password = hash
    const newUser = new this.userModel(data)
    const createdNewUser = new this.userModel(newUser)
    return createdNewUser.save();
  }
}
