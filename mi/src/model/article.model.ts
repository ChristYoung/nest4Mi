// 使用了typegoose定义的model后, 就相当于定义了之前的Schema
import { getModelForClass, prop } from '@typegoose/typegoose';

export class Article {
    @prop()
    title: string;

    @prop()
    author: string;

    @prop()
    keywords: string;

    @prop()
    status: number;
}

export const ArticleModel = getModelForClass(Article);
