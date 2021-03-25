import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CotestController } from './cotest.controller';
import { CoTest, CoTestSchema } from './cotest.model';
import { CoTestService } from './cotest.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'webcounters', schema: CoTestSchema }], 'webcounters')],
    providers: [CoTestService],
    controllers: [CotestController],
    exports: [CoTestService]    
})
export class CoTestModule { }
