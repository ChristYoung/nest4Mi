// 日志管理的中间件
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    console.log(`日志中间件被访问: ${Date.now()}`);

    next();
  }
}
