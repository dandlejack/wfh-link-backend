import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule'
import { Model } from 'mongoose'
import { UsersProps } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
    constructor(private usersService: UsersService) {
    }
    @Cron('0 0 * * *')
    handleCron() {
        this.usersService.resetReferralCounterOfDay()
    }
}
