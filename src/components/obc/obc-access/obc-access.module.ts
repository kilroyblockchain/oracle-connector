import { Module } from '@nestjs/common';
import { OBCAccessService } from './obc-access.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OBCAccessService],
  exports: [OBCAccessService],
})
export class OBCAccessModule {}
