import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UsersSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }], 'users')],
  providers: [UsersService],
  controllers: [UserController],
  exports:[UsersService]
})
export class UsersModule {}
