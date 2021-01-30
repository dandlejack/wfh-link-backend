import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){
    }
    
    @Post('/login')
    postLogin(@Req() req: Request, @Res() res: Response){
        return this.authService.login(req,res)
    }

}
