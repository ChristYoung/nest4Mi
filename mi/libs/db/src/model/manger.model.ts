// 后台管理员的用户模型
import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

// 使得接口的返回中包含创建时间字段
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class MangerModel {

    @ApiProperty({ description: '用户名', example: 'user1' })
    @prop()
    userName: string; // 用户名

    @ApiProperty({ description: '密码', example: 'pass1' })
    @prop({
        select: false, // 表示在常规的数据库查询中, 不把密码给返回给前端
    })
    password: string; // 密码
}
