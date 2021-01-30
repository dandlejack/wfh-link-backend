import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaidController } from './paid.controller';
import { PaidSchema } from './paid.model';
import { PaidService } from './paid.service';

@Module({
    imports : [MongooseModule.forFeature([{ name: 'paid', schema: PaidSchema }], 'paid')],
    controllers: [PaidController],
    providers: [PaidService]
  })
export class PaidModule {}
