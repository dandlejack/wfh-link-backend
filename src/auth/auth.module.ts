import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/users/users.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }], 'users'), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1 hrs' },
  }),],
  providers: [AuthService],  
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
