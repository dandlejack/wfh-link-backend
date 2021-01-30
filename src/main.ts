import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser'
// import {mongoose} from 'mongoose'
// mongoose.set('useFindAndModify',true)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
