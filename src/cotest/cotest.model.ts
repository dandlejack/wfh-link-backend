import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type CoTestDocument = CoTest & mongoose.Document

@Schema()
export class CoTest {
    @Prop()
    counter: Number;
    @Prop()
    date: string;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface CoTestProps {
    _id?: string;    
    counter: Number;
    date: string;
    createdDate: Date;
    updateDate: Date;
}

export const CoTestSchema = SchemaFactory.createForClass(CoTest)
