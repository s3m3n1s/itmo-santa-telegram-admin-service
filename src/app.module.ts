import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { GiftsModule } from 'gifts/gifts.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './middleware/session.middleware';

require('dotenv').config();

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'ITMOSANTA_ADMIN_BOT',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [AuthModule, GiftsModule],
      }),
    }),
    AuthModule,
    GiftsModule,
  ],
})
export class AppModule {}
