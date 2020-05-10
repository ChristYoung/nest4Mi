import { ArgumentMetadata, Injectable, PipeTransform, UsePipes } from '@nestjs/common';

@Injectable()
export class NewsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value就是get请求或者post请求传过来的值', value);
    return value;
  }
}
