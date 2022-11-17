import { Module } from '@nestjs/common';
import { OBCModule } from '../obc/obc.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [OBCModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
