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

@Module({
  imports: [CustomerModule,PaidModule,  ReceivedModule, JobsPostModule, AuthModule, UsersModule,
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
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
