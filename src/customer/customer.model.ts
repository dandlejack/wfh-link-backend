import {MongooseModule, Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { CustomerModule } from './customer.module';

export type CustomerDocument = Customer & mongoose.Document

@Schema()
export class Customer {
    @Prop()
    customer_name: string;    
    @Prop()
    createdDate:Date;
    @Prop()
    updateDate:Date;
}
export interface CustomerProps {
    _id:string;
    customer_name:string;
    createdDate:Date;
    updateDate:Date;
}

export const CustomerSchema  = SchemaFactory.createForClass(Customer)
