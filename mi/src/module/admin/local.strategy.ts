// 使用本地策略实现登录
// 详见nestjs官网, authoration章节
import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { MangerModel } from '@db/db/model/manger.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        @InjectModel(MangerModel) private readonly mangerModel: ReturnModelType<typeof MangerModel>,
    ) {
        super({
            usernameField: 'userName',
            passwordField: 'password',
        } as IStrategyOptions);
    }

    async validate(userName: string, password: string) {

        // 先通过用户名查询到一个用户
        const manger = await this.mangerModel.findOne({ userName }).select('+password'); // 因为password已经在model中设置了查询不返回, 因此在这边需要显式地加上需要密码返回

        // 判断是否通过用户名查找到用户
        if (!manger) {
            throw new BadRequestException('用户不存在~');
        }

        // 如果通过用户名查找到用户了, 则判断用户输入的密码是否和查找到的用户的密码一致
        if (!compareSync(password, manger.password)) {
            throw new BadRequestException('密码不正确~');
        }

        return manger;
    }
}
