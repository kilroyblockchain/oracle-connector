import { Module } from '@nestjs/common';
import { OBCModule } from '../obc/obc.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [OBCModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
