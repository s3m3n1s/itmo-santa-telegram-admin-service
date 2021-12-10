import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Command, Ctx, On, Update } from 'nestjs-telegraf';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';

import { AdminGuard } from 'common/guards/admin.guard';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@UseGuards(AdminGuard)
export class GiftsUpdate {
  @Command('/take')
  async takeGift(@Ctx() ctx) {
    await ctx.scene.enter('TAKE_SCENE');
  }

  @Command('/give')
  async giveGift(@Ctx() ctx) {
    await ctx.scene.enter('GIVE_SCENE');
  }

  @Command('/check')
  async checkGift(@Ctx() ctx) {
    await ctx.scene.enter('CHECK_SCENE');
  }

  @On('message')
  async onMessage() {
    return 'Вы не находитесь ни в одном из режимов.\nВведите команду (/take, /give, /check), чтобы иметь возможность вводить коды подарков.';
  }
}
