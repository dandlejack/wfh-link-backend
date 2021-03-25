import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebConterSchema } from './webcounter.model'
import { WebcounterService } from './webcounter.service'
import { WebcounterController } from './webcounter.controller'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'webcounters', schema: WebConterSchema }], 'webcounters')],
    providers: [WebcounterService],
    controllers: [WebcounterController],
    exports: [WebcounterService]
})
export class WebcounterModule { }
