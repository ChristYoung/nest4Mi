import { Controller, Get, Query, Param, Post, Body, Request, UseInterceptors, UploadedFile, UploadedFiles, UsePipes, Render } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ArticleService } from 'src/service/article/article.service';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { ArticleModel } from '@db/db/model/article.model';

@Controller('article')
export class ArticleController {

    constructor(
        private articleService: ArticleService,
    ) { }

    @Get()
    index(): string {
        return '我是一个文章页面';
    }

    // 渲染一个页面
    @Get('yj')
    @Render('admin/index')
    testRenderPageByServer() {
        const name = '杨杰';
        return { name };
    }

    // 适用于 add?id=33&code=66 类型的路由
    @Get('add')
    testArticle1(@Query() query: { [key: string]: string }) {
        console.log('query', query);
        return query;
    }

    // 适用于 add/33/66 类型的路由
    @Get('add2/:id/:code')
    testArticle2(@Param('id') id: string, @Param('code') code: string) {
        return { id, code };
    }

    @Post('create')
    testCreate(@Body() body: any) {
        console.log('这是一个post请求', body);
        return body;
    }

    @Post('update')
    testUpdate(@Request() req: any) {
        req.session.usename = 'kingJay';
        console.log('这是一个post请求aaa', req.session.usename); // 获取服务器上的session从req.session中获取
        console.log('这是一个post请求bbb', req.body.gender); // 前端请求的入参数据从req.body中获取
    }

    // 上传单个文件
    @Post('upload')
    @UseInterceptors(FileInterceptor('file')) // 接收formData的key值
    testUploadFile(@UploadedFile('file') file: any) {
        console.log('当前上传到服务器的文件是: ', file);

        // 创建一个写入文件流
        // createWriteStream第二个参数是写入服务器的文件的名称
        // const writeStream = createWriteStream(join(__dirname, '../../public/upload', `${file.originalname}`));
        // 执行文件写入
        // writeStream.write(file.buffer);

        // return file;
        return { success: '成功~', url: `http://localhost:8080/static/upload/${file.filename}` };
    }

    // 上传多个文件
    // 以Nodejs的方式手动将前端传入的buffer文件写入到服务器的upload路径中
    @Post('uploadMany')
    @UseInterceptors(FilesInterceptor('files'))
    testUploadManyFiles(@UploadedFiles() files: any) {
        console.log('当前上传到服务器的多个~文件是', files);
        for (const f of files) {
            const writeStream = createWriteStream(join(__dirname, '../../public/upload', `${f.originalname}`));
            writeStream.write(f.buffer);
        }
        return { msg: '当前上传到服务器的多个~文件是' };
    }

    // 获取全部的文章
    @Get('getAllArticles')
    async getAllArticles() {
        const res = await this.articleService.getAllArticles();
        return { res, msg: '查询成功~~' };
    }

    // 创建文章
    @Post('addArticle')
    async addArticle(@Body() articleDto: ArticleModel) {
        await this.articleService.addArticle(articleDto);
        return { succes: true, msg: '创建成功~' };
    }

}
