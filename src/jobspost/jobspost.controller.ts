import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { JobsPostProps } from './jobspost.model';
import { JobsPostService } from './jobspost.service';
import { Request, Response } from 'express';
@Controller('jobspost')
export class JobsPostController {
    constructor(private jobsPostService:JobsPostService){
    }
    // @Get('/findall')
    // findAll(@Req() req: Request, @Res() res: Response):Object{
    //         return this.jobsPostService.findAll(req,res)
    // }
    @Get('/findall')
     async findAll(@Req() req: Request, @Res() res: Response){
            const result = await this.jobsPostService.findAll(req,res)
            res.send(result);
    }

    @Get('/findAds')
     async findAds(@Req() req: Request, @Res() res: Response){
            const result = await this.jobsPostService.findAds(req,res)
            res.send(result);             
    }
    @Get('/findSponserAds')
     async findAdsAdmin(@Req() req: Request, @Res() res: Response){
            const result = await this.jobsPostService.findAds(req,res)
            res.send(result);             
    }

    @Get('/findCompanyRequired')
     async findCompanyRequired(@Req() req: Request, @Res() res: Response){
            const result = await this.jobsPostService.findLatestCompanyRequired(req,res)
            res.send(result);
    }

    @Get('/findByUserID')
    async findByUserId(@Req() req:Request, @Res() res: Response){
        const result = await this.jobsPostService.findByUserID(req,res)
        res.send(result)
    }

    @Get('/:id')
    async findById(@Param('id') id:string){
        const result = await this.jobsPostService.findById(id)        
        return result
    }
    @Get('/post/:id')
    async findPostById(@Param('id') id:string){
        const result = await this.jobsPostService.findPostById(id)        
        return result
    }

    @Post()
    insert(@Body() data:any){
        return this.jobsPostService.insert(data)
    }

    @Put('/:id')
    updateById(@Param('id') id:string ,@Body() data:JobsPostProps){
        return this.jobsPostService.updateById(id,data)
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string){
        return this.jobsPostService.deleteById(id)
    }
}
