import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ArticleModule } from './article/article.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ArticleModule,
    ApiModule,
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
