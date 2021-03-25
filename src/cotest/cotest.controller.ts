import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoTestService } from './cotest.service';

@Controller('cotest')
export class CotestController {
    constructor(private cotestService: CoTestService) {
    }
    

    @Get('/findall')
    async findAll(@Req() req: Request, @Res() res: Response) {
        const result = await this.cotestService.findAll(req, res)
        res.send(result);
    }
    @Get('/newUpdate')
    async findLastest(@Req() req: Request, @Res() res: Response) {
        const checkDate = await this.cotestService.findHaveCurDate(req, res)
        if(checkDate.length>0){
            await this.cotestService.incrementCount(checkDate[0])
        }else{
            await this.cotestService.insert()
        }
        res.send({status:'successful'});
    }
}
