import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { MangerController } from './manger/manger.controller';

@Module({
  controllers: [MainController, LoginController, MangerController],
})
export class AdminModule { }
