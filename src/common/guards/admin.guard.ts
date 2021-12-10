import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf';
import { Context } from '../../interfaces/context.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly ADMIN_IDS = this.getAdminIds();

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    const isAdmin = this.ADMIN_IDS.includes(from.id);

    if (!isAdmin) {
      throw new TelegrafException(
        'Вы не имеете доступа к данному боту. По всем вопросам обращайтесь к @partnadem',
      );
    }

    return true;
  }

  getAdminIds() {
    return process.env.ADMIN_IDS.split(',').map((id) => Number(id));
  }
}
