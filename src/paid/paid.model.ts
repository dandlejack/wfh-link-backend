import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type PaidDocument = Paid & mongoose.Document

@Schema()
export class Paid {
    @Prop()
    invoice_id: string;
    @Prop()
    invoice_date: string;
    @Prop()
    customer_name: string;
    @Prop()
    data_table: Array<Object>;
    @Prop()
    date: Date;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface PaidProps {
    _id: string;
    invoice_id: string;
    invoice_date: string;
    customer_name: string;
    data_table: Array<Object>;
    date: Date;
    createdDate: Date;
    updateDate: Date;
}

export const PaidSchema = SchemaFactory.createForClass(Paid)
