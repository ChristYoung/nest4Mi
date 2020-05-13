import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

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
    @prop()
    password: string; // 密码
}
