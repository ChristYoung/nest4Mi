import { createParamDecorator } from '@nestjs/common';

// 当前用户装饰器
export const CurrentUser = createParamDecorator((data, req) => req.user);
