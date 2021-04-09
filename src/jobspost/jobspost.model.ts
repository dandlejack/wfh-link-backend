import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type JobsPostDocument = JobsPost & mongoose.Document

@Schema()
export class JobsPost {
    @Prop()
    post_id: string;
    @Prop()
    post_title:string;
    @Prop()
    province:Array<String>;
    @Prop()
    scholar_degree: string;
    @Prop()
    job_position: string;
    @Prop()
    work_experience: string;
    @Prop()
    work_type: Array<String>;
    @Prop()
    work_select: Array<String>;
    @Prop()
    responsibility:Array<Object>
    @Prop()
    jobshighlights:Array<Object>
    @Prop()
    jobproperties:Array<Object>
    @Prop()
    benefits:Array<Object>
    @Prop()
    company_name: string;
    @Prop()
    company_description: string;
    @Prop()
    company_email: string;
    @Prop()
    line_id: string;
    @Prop()
    company_facebook: string;
    @Prop()
    company_tel: string;
    @Prop()
    title_image: string;
    @Prop()
    logo_image: string;
    @Prop()
    all_works:string;
    @Prop()
    all_province:string;
    @Prop()
    required_worker:number;
    @Prop()
    date: Date;
    @Prop()
    role:string
    @Prop()
    user_id: string;
    @Prop()
    post_date: string;
    @Prop()
    counter: Number;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface JobsPostProps {
    _id: string;
    post_id: string;
    post_title:string;
    province:Array<String>;
    scholar_degree: string;
    job_position: string;
    work_experience: string;
    work_type: Array<String>;
    responsibility:Array<Object>
    jobshighlights:Array<Object>
    jobproperties:Array<Object>
    benefits:Array<Object>
    company_name:string
    company_description: string;
    company_email: string;
    line_id: string;
    company_facebook: string;
    company_tel: string;
    title_image: string;
    logo_image: string;
    all_works:string;
    all_province:string;
    required_worker:number;
    date: Date;
    role:string;
    user_id:string;
    post_date:string;
    counter: Number;
    createdDate: Date;
    updateDate: Date;
}

export const JobsPostSchema = SchemaFactory.createForClass(JobsPost)
