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
import { ToptenController } from './topten/topten.controller';
import { ToptenService } from './topten/topten.service';
import { ToptenModule } from './topten/topten.module';

@Module({
  imports: [CustomerModule,PaidModule,  ReceivedModule, JobsPostModule, AuthModule, UsersModule, PhotosModule, ToptenModule,
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
  }) ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
