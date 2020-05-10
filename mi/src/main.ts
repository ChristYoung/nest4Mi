import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  // 配置数据录链接
  mongoose.connect('mongodb://localhost/mi4', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 开启全局验证的管道
  app.useGlobalPipes(new ValidationPipe());

  // 构建静态资源配置
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/', // 配置虚拟目录
  });

  // 配置模板引擎
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // 配置模板文件的放置目录
  app.setViewEngine('ejs'); // 以ejs为模板引擎

  // 配置session中间件
  app.use(session(
    {
      secret: 'keyboard cat',
      cookie: { maxAge: 60000, httpOnly: true },
      rolling: true, // 每次请求session后, 都将过期时间再次延长
    },
  ));

  await app.listen(8080);
  console.log('服务启动成功,', 'http://localhost:8080');
}
bootstrap();
