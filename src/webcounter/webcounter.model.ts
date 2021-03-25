import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
export type WebCounterDocument = WebCounters & mongoose.Document

@Schema()
export class WebCounters {
    @Prop()
    counter: Number;
    @Prop()
    date: string;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface WebCountersProps {
    _id?: string;    
    counter: Number;
    date: string;
    createdDate: Date;
    updateDate: Date;
}

export const WebConterSchema = SchemaFactory.createForClass(WebCounters)
