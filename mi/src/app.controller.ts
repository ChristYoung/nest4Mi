import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('yj')
  @Render('admin/index')
  getUserName() {
    const name = '杨杰';
    return { name };
  }
}
