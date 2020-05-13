import { prop } from '@typegoose/typegoose';

export class MangerModel {

    @prop()
    userName: string;

    @prop()
    password: string;
}
