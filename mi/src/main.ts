import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局配置swagger
  const options = new DocumentBuilder()
    .setTitle('Mi')
    .setDescription('供使用NestJs学习的接口文档')
    .setVersion('1.0')
    .addTag('Mi')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

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

  const SERVER_PORT = process.env.SERVER_PORT || '8080'; // 服务器的端口, 从.env的配置文件中获取, 默认8080
  await app.listen(SERVER_PORT);
  console.log('服务启动成功,', `http://localhost:${SERVER_PORT}/doc`);
}
bootstrap();
