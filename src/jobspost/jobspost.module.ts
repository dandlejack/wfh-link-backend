import { Module } from '@nestjs/common';
import { JobsPostService } from './jobspost.service';
import { JobsPostController } from './jobspost.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsPostSchema } from './jobspost.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'jobspost', schema:JobsPostSchema}], 'jobspost')],
  providers: [JobsPostService],
  controllers: [JobsPostController],
  exports:[JobsPostService]
})
export class JobsPostModule {}
