import { Module } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AccessTokenService],
})
export class AccessTokenModule {}
