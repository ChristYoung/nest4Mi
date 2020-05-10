import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ArticleModule } from './article/article.module';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ArticleModule,
    ApiModule,
    // 配置数据录链接
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/koa', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('article'); // 设置哪些路由使用这些中间件, 如果要匹配所有路由, 使用forRoutes('*')
  }

}
