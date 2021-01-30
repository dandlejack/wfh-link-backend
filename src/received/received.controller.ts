import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReceivedProps } from './received.model';
import { ReceivedService } from './received.service';

@Controller('received')
export class ReceivedController {
    constructor(private receivedService:ReceivedService){
    }
    @Get('/findall')
    async findAll(@Req() req: Request, @Res() res: Response){
        const result = await this.receivedService.findAll(req,res)
        res.send(result);     
    }

    @Get('/:id')
    findById(@Param('id') id:string){
        return this.receivedService.findById(id)        
    }

    @Post()
    insert(@Body() data:any){
        return this.receivedService.insert(data)
    }

    @Put('/:id')
    updateById(@Param('id') id:string ,@Body() data:ReceivedProps){
        return this.receivedService.updateById(id,data)
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string){
        return this.receivedService.deleteById(id)
    }
}
