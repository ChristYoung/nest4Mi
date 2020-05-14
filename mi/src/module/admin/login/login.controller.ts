// 登录注册
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from 'src/dto/register.dto';
import { InjectModel } from 'nestjs-typegoose';
import { MangerModel } from '@db/db/model/manger.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Controller('auth')
@ApiTags('用户登录注册')
export class LoginController {

    constructor(
        private jwtService: JwtService,
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
    @UseGuards(AuthGuard('local'))
    async login(@Body() loginDto: LoginDto, @CurrentUser() manger: DocumentType<MangerModel>) {
        // 使用这个守卫成功后req.user就是该登录用户的返回
        return {
            token: this.jwtService.sign(String(manger._id)), // 使用用户id, 使用jwt生成token, ps: (_id是mogoDB的一个ObjectId对象, 因此需要转义成字符串再使用)
        };
    }

    // 登录成功后根据前端请求头中的token, 定位到当前是哪个用户
    @Get('user')
    @ApiOperation({ summary: '获取用户个人信息' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async user(@CurrentUser() manger: DocumentType<MangerModel>) {
        return manger;
    }
}
