import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@db/db';
import { JwtModule } from '@nestjs/jwt';

// 将该common模块设置为全局引用
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    DbModule,
  ],
  providers: [],
  exports: [JwtModule],
})
export class CommonModule { }
