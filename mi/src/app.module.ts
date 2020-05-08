import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';

@Module({
  imports: [],
  controllers: [AppController, ArticleController],
  providers: [AppService],
})
export class AppModule {}
