import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleModel } from './model/article.model';
import { MangerModel } from './model/manger.model';

// 将所有要用到的model进行导入导出
const models = TypegooseModule.forFeature([ArticleModel, MangerModel]);

// 将该数据库模块设置为全局引用
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/mi4', { // 配置链接数据库
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
