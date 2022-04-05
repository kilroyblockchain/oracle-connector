import { Module } from '@nestjs/common';
import { OBCAccessModule } from './obc-access/obc-access.module';
import { OBCController } from './obc.controller';
import { OBCService } from './obc.service';

@Module({
  imports: [OBCAccessModule],
  controllers: [OBCController],
  providers: [OBCService],
  exports: [OBCService],
})
export class OBCModule {}
