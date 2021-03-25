import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoTestService } from './cotest.service';

@Controller('cotest')
export class CotestController {
    constructor(private cotestService: CoTestService) {
    }
    @Post()
    insert(@Body() data: any) {
        return this.cotestService.insert(data)
    }

    @Get('/findall')
    async findAll(@Req() req: Request, @Res() res: Response) {
        const result = await this.cotestService.findAll(req, res)
        res.send(result);
    }
    @Get('/findlastest')
    async findLastest(@Req() req: Request, @Res() res: Response) {
        const result = await this.cotestService.findLatestDate(req, res)
        res.send(result);
    }
    @Get('/post/topten/:id')
    async findPostById(@Param('id') id: string) {
        const result = await this.cotestService.findById(id)
        return result
    }
    @Get('/findMaxValue')
    async findMax(@Req() req: Request, @Res() res: Response) {
        const result = await this.cotestService.findMax(req, res)
        res.send(result);
    }
}
