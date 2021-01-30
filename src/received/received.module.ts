import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceivedController } from './received.controller';
import { ReceivedSchema } from './received.model';
import { ReceivedService } from './received.service';

@Module({
  imports : [MongooseModule.forFeature([{ name: 'received', schema: ReceivedSchema }], 'received')],
  controllers: [ReceivedController],
  providers: [ReceivedService]
})
export class ReceivedModule {}
