import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToptenController } from './topten.controller';
import { TopTen, TopTenSchema } from './topten.model';
import { ToptenService } from './topten.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'toptens', schema: TopTenSchema }], 'toptens')],
    providers: [ToptenService],
    controllers: [ToptenController],
    exports: [ToptenService]    
})
export class ToptenModule { }
