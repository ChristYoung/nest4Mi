import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { MangerModel } from '@db/db/model/manger.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectModel(MangerModel) private readonly mangerModel: ReturnModelType<typeof MangerModel>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头的header中取出token
            secretOrKey: process.env.JWT_SECRET, // 根据约定好的JWT_SECRET将token解密, 生成用户的id放到validate方法的入参中
        } as StrategyOptions);
    }

    async validate(id) {
        return await this.mangerModel.findById(id);
    }
}
