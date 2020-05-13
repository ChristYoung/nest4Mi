import { prop } from '@typegoose/typegoose';

export class MangerModel {

    @prop()
    userName: string; // 用户名

    @prop()
    password: string; // 密码
}
