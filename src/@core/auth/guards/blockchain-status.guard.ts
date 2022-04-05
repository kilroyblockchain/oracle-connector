import {
  Injectable,
  ExecutionContext,
  CanActivate,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserService } from 'src/components/user/user.service';
dotenv.config();

@Injectable()
export class BlockchainStatusGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const logger = new Logger('BlockchainGuard');
    const headers = context.switchToHttp().getRequest().headers;
    if (!headers.user_id) {
      logger.error('User Id not found on the header: user_id');
      throw new BadRequestException(['User Id Not Found On The Header']);
    }
    await this.userService.checkUser(headers.user_id);
    return headers;
  }
}
