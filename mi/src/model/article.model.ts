import { prop } from '@typegoose/typegoose';

export class ArticleModel {
    @prop()
    title: string;

    @prop()
    author: string;

    @prop()
    keywords: string;

    @prop()
    status: number;
}
