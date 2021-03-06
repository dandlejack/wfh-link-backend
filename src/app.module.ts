import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaidModule } from './paid/paid.module';
import { ReceivedModule } from './received/received.module';
import { JobsPostModule } from './jobspost/jobspost.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { ToptenModule } from './topten/topten.module';
import { WebcounterModule } from './webcounter/webcounter.module';
import { CoTestModule } from './cotest/cotest.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [CustomerModule,PaidModule,  ReceivedModule, JobsPostModule, AuthModule, UsersModule, PhotosModule, ToptenModule,CoTestModule, WebcounterModule,
     MongooseModule.forRoot('mongodb://localhost:27017/wfhjobs',{
    connectionName: 'customer'
  }), MongooseModule.forRoot('mongodb://localhost:27017/wfhjobs',{
    connectionName: 'paid'
  }), MongooseModule.forRoot('mongodb://localhost:27017/wfhjobs',{
    connectionName: 'received'
  }), MongooseModule.forRoot('mongodb://localhost:27017/wfhjobs',{
    connectionName: 'jobspost'
  }), MongooseModule.forRoot('mongodb://localhost:27017/wfhjobs',{
    connectionName: 'users'
  }), MongooseModule.forRoot('mongodb://localhost:27017/wfhjobs',{
    connectionName: 'toptens'
  }), MongooseModule.forRoot('mongodb://localhost:27017/wfhjobs',{
    connectionName: 'webcounters'
  }),ScheduleModule.forRoot() ],
  controllers: [AppController],
  providers: [AppService, TasksService]
})
export class AppModule {}
