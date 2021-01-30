import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
export type ReceivedDocument = Received & mongoose.Document

@Schema()
export class Received {
    @Prop()
    invoice_id: string;
    @Prop()
    invoice_date: string;
    @Prop()
    seller: string;
    @Prop()
    data_table: Array<Object>;
    @Prop()
    date: Date;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface ReceivedProps {
    _id: string;
    invoice_id: string;
    invoice_date: string;
    seller: string;
    data_table: Array<Object>;
    date: Date;
    createdDate: Date;
    updateDate: Date;
}

export const ReceivedSchema = SchemaFactory.createForClass(Received)
