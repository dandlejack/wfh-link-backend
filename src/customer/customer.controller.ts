import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerProps } from './customer.model';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService:CustomerService){
    }

    @Get('/findall')
    findAll():Object{
        return this.customerService.findAll()
    }

    @Get('/:id')
    findById(@Param('id') id:string){
        return this.customerService.findById(id)
    }

    @Post()
    insert(@Body('customer_name') customer_name:string){
        return this.customerService.insert(customer_name)
    }

    @Put('/:id')
    updateById(@Param('id') id:string ,@Body() data:CustomerProps){
        return this.customerService.updateById(id,data)
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string){
        return this.customerService.deleteById(id)
    }
}
