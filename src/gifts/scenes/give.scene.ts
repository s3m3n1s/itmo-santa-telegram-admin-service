import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { AdminGuard } from 'common/guards/admin.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import { validateGiftCode } from 'common/validators';
import { GiftsService } from 'gifts/gifts.service';
import { Command, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@Scene('GIVE_SCENE')
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@UseGuards(AdminGuard)
export class GiveScene {
  constructor(private readonly giftsService: GiftsService) {}
  @SceneEnter()
  onSceneEnter(): string {
    return 'Режим выдачи подарков включен. Введите код получения подарка';
  }

  @Command('cancel')
  async exitScene(@Ctx() ctx) {
    ctx.scene.leave();
    return 'Режим выдачи подарков отключен. Возвращаюсь в основное режим.';
  }

  @On('message')
  async giveGift(@Ctx() ctx) {
    const code = ctx.update.message.text;
    const { id } = ctx.from;

    const validation = validateGiftCode(code);
    if (!validation.status) {
      return validation.msg;
    }

    return this.giftsService.giveGift(code, id);
  }
}
