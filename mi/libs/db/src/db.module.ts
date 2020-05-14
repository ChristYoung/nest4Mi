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
    // 配置异步加载的方式链接数据库
    // 在获取配置文件的common.module获取成功后, 才读取process.env.DB
    TypegooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
