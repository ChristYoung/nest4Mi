import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleSchema } from '../../src/schema/article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from 'src/service/article/article.service';

@Module({
  imports: [
      // 配置数据库model
      MongooseModule.forFeature([
        {
            name: 'Article',
            schema: ArticleSchema,
            collection: 'article',
        },
      ]),
    ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
