import { Injectable } from '@nestjs/common';
import { ArticleModel } from 'src/model/article.model';
import { ArticleDto } from 'src/dto/article.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {

    // 将ArticleModel以依赖注入的方式引入进来
    constructor(
        @InjectModel(ArticleModel) private readonly articleModel: Model<any>,
    ) {

    }

    // 查询全部文章
    async getAllArticles() {
        return await this.articleModel.find();
    }

    // 创建一篇文章
    async addArticle(articleDto: ArticleDto) {
        return await this.articleModel.create(articleDto);
    }

}
