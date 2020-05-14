import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: '用户名' })
    userName: string;

    @ApiProperty({ description: '密码' })
    password?: string;

    [key: string]: any; // 允许前端传入冗余的字段
}
