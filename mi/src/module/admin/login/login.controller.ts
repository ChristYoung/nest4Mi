// 登录注册
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from 'src/dto/register.dto';
import { InjectModel } from 'nestjs-typegoose';
import { MangerModel } from '@db/db/model/manger.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';

@Controller('auth')
@ApiTags('用户登录注册')
export class LoginController {

    constructor(
        @InjectModel(MangerModel) private readonly mangerModel: ReturnModelType<typeof MangerModel>,
    ) { }

    // 注册
    @Post('register')
    @ApiOperation({ summary: '用户注册' })
    async register(@Body() registerDto: RegisterDto) {
        const userName = registerDto.userName;
        const password = hashSync(registerDto.password); // 对前端传入的密码进行散列处理
        const manger = await this.mangerModel.create({ userName, password }); // 在manger表中新增一条数据
        return manger;
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
