import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type TopTenDocument = TopTen & mongoose.Document

@Schema()
export class TopTen {
    @Prop()
    list_data:Array<Object>
    @Prop()
    topten_date: string;
    @Prop()
    topten_id: string;
    @Prop()
    hightest_all:Boolean;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface TopTenProps {
    _id: string;
    list_data:Array<Object>;
    topten_date:string;
    topten_id:string;
    hightest_all:Boolean;
    createdDate: Date;
    updateDate: Date;
}

export const TopTenSchema = SchemaFactory.createForClass(TopTen)
