import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
export type UsersDocument = Users & mongoose.Document

@Schema()
export class Users {
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    role: string;
    @Prop()
    firstname: string;
    @Prop()
    lastname: string;
    @Prop()
    lineID: string;
    @Prop()
    telNumber: string;
    @Prop()
    myReferral: string;
    @Prop()
    lastestIpFromReferral:Array<Object>
    @Prop()
    clickRefCounter:Number
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface UsersProps {
    _id: string;
    email:string;
    password:string;
    lineID: string;
    telNumber: string;
    role:string
    myReferral: string;
    lastestIpFromReferral:Array<Object>
    clickRefCounter:Number
    createdDate: Date;
    updateDate: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users)
