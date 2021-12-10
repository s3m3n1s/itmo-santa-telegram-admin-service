import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsUpdate } from './gifts.update';
import { CheckScene } from './scenes/check.scene';
import { GiveScene } from './scenes/give.scene';
import { TakeScene } from './scenes/take.scene';

@Module({
  providers: [GiftsUpdate, GiftsService, TakeScene, GiveScene, CheckScene],
})
export class GiftsModule {}
