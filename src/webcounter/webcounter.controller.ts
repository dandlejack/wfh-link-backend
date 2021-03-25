import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { WebcounterService } from './webcounter.service';
import { Request, Response } from 'express';
import { get } from 'http';

@Controller('webcounter')
export class WebcounterController {
    constructor(private webCounterService: WebcounterService) {
    }

    @Get('/newUpdate')
    async newUpdate(@Req() req: Request, @Res() res: Response) {
        const checkDate = await this.webCounterService.findHaveCurDate(req, res)
        if(checkDate.length>0){
            await this.webCounterService.incrementCount(checkDate[0])
        }else{
            await this.webCounterService.insert()
        }
        res.send({status:'successful'});
    }

    @Get('/getVisitor')
    async getVisitor(@Req() req: Request, @Res() res: Response){
        const results = await this.webCounterService.getVisitWeb(req, res)
        res.send(results)
    }
    @Get('/findall')
    async findAll(@Req() req: Request, @Res() res: Response) {
        const result = await this.webCounterService.findAll(req, res)
        res.send(result);
    }

}
