import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { MangerController } from './manger/manger.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
  ],
  controllers: [MainController, LoginController, MangerController],
  providers: [LocalStrategy, JwtStrategy],
})
export class AdminModule { }
