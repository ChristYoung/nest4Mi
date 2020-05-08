import { Controller, Get, Query, Param, Post, Body, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('article')
export class ArticleController {

    @Get()
    index(): string {
        return '我是一个文章页面';
    }

    // 适用于 add?id=33&code=66 类型的路由
    @Get('add')
    addArticle(@Query() query: {[key: string]: string}) {
        console.log('query', query);
        return query;
    }

    // 适用于 add/33/66 类型的路由
    @Get('add2/:id/:code')
    addArticle2(@Param('id') id: string, @Param('code') code: string) {
        console.log('addArticle2 -> id', id);
        console.log('addArticle2 -> code', code);
        return { id, code };
    }

    @Post('create')
    create(@Body() body: any) {
        console.log('这是一个post请求', body);
        return body;
    }

    @Post('update')
    update(@Request() req: any) {
        req.session.usename = 'kingJay';
        console.log('这是一个post请求aaa', req.session.usename); // 获取服务器上的session从req.session中获取
        console.log('这是一个post请求bbb', req.body.gender); // 前端请求的入参数据从req.body中获取
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file')) // 接收fprmData的key值
    // uploadFile(@UploadedFile() file: any) {
    //     console.log('当前上传到服务器的文件是: ', file);
    // }

}
