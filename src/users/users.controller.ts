import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersProps } from './users.model';
import { UsersService } from './users.service';


@Controller('users')
export class UserController {
    constructor(private usersService:UsersService){
    }
    @Get('/findall')
    async findAll(@Req() req: Request, @Res() res: Response){
        const result = await this.usersService.findAll(req,res)
        res.send(result);     
    }

    @Get('/:id')
    findById(@Param('id') id:string){
        return this.usersService.findById(id)        
    }

    @Post('/register')
    insert(@Body() data:any){
        return this.usersService.insert(data)
    }

    @Put('/:id')
    updateById(@Param('id') id:string ,@Body() data:UsersProps){
        return this.usersService.updateById(id,data)
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string){
        return this.usersService.deleteById(id)
    }  
}
