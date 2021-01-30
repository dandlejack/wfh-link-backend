import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CustomerProps } from 'src/customer/customer.model';
import {Response,Request} from 'express'
import { PaidProps } from './paid.model';
import {PaidService} from './paid.service'
@Controller('paid')
export class PaidController {
    constructor(private paidService:PaidService){
    }
    @Get('/findall')
    async findAll(@Req() req: Request, @Res() res: Response){
        const result = await this.paidService.findAll(req,res)
        res.send(result);     
    }

    @Get('/:id')
    findById(@Param('id') id:string){
        return this.paidService.findById(id)        
    }

    @Post()
    insert(@Body() data:any){
        return this.paidService.insert(data)
    }

    @Put('/:id')
    updateById(@Param('id') id:string ,@Body() data:PaidProps){
        return this.paidService.updateById(id,data)
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string){
        return this.paidService.deleteById(id)
    }
}
