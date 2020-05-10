import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleSchema } from '../../src/schema/article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from 'src/service/article/article.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
