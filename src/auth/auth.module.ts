import { Module } from '@nestjs/common';
import { AuthUpdate } from './auth.update';

@Module({
  providers: [AuthUpdate],
})
export class AuthModule {}
