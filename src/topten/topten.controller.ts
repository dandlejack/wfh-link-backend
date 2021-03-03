import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ToptenService } from './topten.service';

@Controller('topten')
export class ToptenController {
    constructor(private toptenService: ToptenService) {
    }
    @Post()
    insert(@Body() data: any) {
        return this.toptenService.insert(data)
    }

    @Get('/findall')
    async findAll(@Req() req: Request, @Res() res: Response) {
        const result = await this.toptenService.findAll(req, res)
        res.send(result);
    }
    @Get('/findlastest')
    async findLastest(@Req() req: Request, @Res() res: Response) {
        const result = await this.toptenService.findLatestDate(req, res)
        res.send(result);
    }
    @Get('/post/topten/:id')
    async findPostById(@Param('id') id: string) {
        const result = await this.toptenService.findById(id)
        return result
    }
    @Get('/findMaxValue')
    async findMax(@Req() req: Request, @Res() res: Response) {
        const result = await this.toptenService.findMax(req, res)
        res.send(result);
    }
}
