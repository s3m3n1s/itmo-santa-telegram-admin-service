import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { AdminGuard } from 'common/guards/admin.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import { validateGiftCode } from 'common/validators';
import { GiftsService } from 'gifts/gifts.service';
import { Command, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@Scene('TAKE_SCENE')
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@UseGuards(AdminGuard)
export class TakeScene {
  constructor(private readonly giftsService: GiftsService) {}
  @SceneEnter()
  onSceneEnter(): string {
    return 'Режим приема подарков включен. Введите код получения подарка';
  }

  @Command('cancel')
  async exitScene(@Ctx() ctx) {
    ctx.scene.leave();
    return 'Режим приема подарков отключен. Возвращаюсь в основное режим.';
  }

  @On('message')
  async takeGift(@Ctx() ctx) {
    const code = ctx.update.message.text;
    if (code === '/check') {
      await ctx.scene.enter('CHECK_SCENE');
      return;
    }
    if (code === '/give') {
      await ctx.scene.enter('GIVE_SCENE');
      return;
    }
    const { id } = ctx.from;

    const validation = validateGiftCode(code);
    if (!validation.status) {
      return validation.msg;
    }

    return this.giftsService.takeGift(code, id);
  }
}
