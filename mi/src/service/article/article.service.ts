import { Injectable } from '@nestjs/common';
import { ArticleModel } from 'src/model/article.model';

@Injectable()
export class ArticleService {

    // 查询全部文章
    async findAll() {
        return await ArticleModel.find();
    }

}
