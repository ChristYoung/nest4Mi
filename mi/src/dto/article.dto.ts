// 入参dto定义
import { IsNotEmpty } from 'class-validator';

export class ArticleDto {

    @IsNotEmpty({ message: '请填写标题' })
    title: string; // 通过IsNotEmpty装饰器确保title字段不能为空

    author: string;

    keywords: string;

    status: number;
}
