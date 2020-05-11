import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from 'src/service/article/article.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleModel } from 'src/model/article.model';

@Module({
  imports: [
    TypegooseModule.forFeature([ArticleModel]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
