import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from 'src/service/article/article.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleModel } from '@db/db/model/article.model';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // 直接使用MulterModule, 自动进行文件上传, 不需要手动使用createWriteStream来写入文件了
    MulterModule.register({
      dest: 'public/upload',
    }),
    TypegooseModule.forFeature([ArticleModel]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule { }
