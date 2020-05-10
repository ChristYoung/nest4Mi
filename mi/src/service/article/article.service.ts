import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticleService {

    constructor(@InjectModel('Article') private articleModel) {}

    // 查询全部文章
    async findAll() {
        const res = await this.articleModel.find().exec(); // 操作数据库
        return res;
    }

}
