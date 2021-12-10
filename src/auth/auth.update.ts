import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Help, Start, Update } from 'nestjs-telegraf';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { AdminGuard } from 'common/guards/admin.guard';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@UseGuards(AdminGuard)
export class AuthUpdate {
  @Start()
  async start() {
    return this.instructions();
  }

  @Help()
  async instructions() {
    return '/take - Принять подарок\n/give - Отдать подарок.\n/check - Проверить статус подарка';
  }
}
