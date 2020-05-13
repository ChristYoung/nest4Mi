import { Injectable } from '@nestjs/common';
import { ArticleModel } from '@db/db/model/article.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ArticleService {

    // 将ArticleModel以依赖注入的方式引入进来
    constructor(
        @InjectModel(ArticleModel) private readonly articleModel: ModelType<ArticleModel>,
    ) {

    }

    // 查询全部文章
    async getAllArticles() {
        return await this.articleModel.find();
    }

    // 创建一篇文章
    async addArticle(articleDto: ArticleModel) {
        return await this.articleModel.create(articleDto);
    }

}
