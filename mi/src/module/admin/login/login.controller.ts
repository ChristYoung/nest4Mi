// 登录注册
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('auth')
@ApiTags('用户登录注册')
export class LoginController {

    constructor() { }

    // 注册
    @Post('register')
    @ApiOperation({ summary: '用户注册' })
    async register(@Body() dto: RegisterDto) {
        return dto;
    }

    // 登录
    @Post('login')
    @ApiOperation({ summary: '用户登录' })
    async login(@Body() dto) {
        return dto;
    }

    @Get('user')
    @ApiOperation({ summary: '获取用户个人信息' })
    async user(@Body() dto) {
        return {};
    }
}
