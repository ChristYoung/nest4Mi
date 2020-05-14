// 用户注册的入参定义
// DTO-->Data transform object
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

    @ApiProperty({ name: '用户名' })
    userName: string;

    @ApiProperty({ name: '登录密码' })
    password?: string;

    [key: string]: any; // 允许前端传入冗余的字段
}
