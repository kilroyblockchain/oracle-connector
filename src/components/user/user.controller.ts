import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationGuard } from 'src/@core/auth/guards/authorization.guard';
import { BlockchainStatusGuard } from 'src/@core/auth/guards/blockchain-status.guard';
import { Response } from 'src/@core/common/dto/response.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  // @UseGuards(AuthorizationGuard)
  async createUser(@Body() registerUserDto: RegisterUserDto) {
    return new Response(
      'User Registered Successfully',
      await this.userService.registerUser(registerUserDto),
    ).setStatusCode(HttpStatus.OK);
  }

  @Get('check/:userId')
  @UseGuards(AuthorizationGuard)
  async checkUserStatus(@Param('userId') userId: string) {
    return new Response(
      'User Exists',
      await this.userService.checkUser(userId),
    ).setStatusCode(HttpStatus.OK);
  }
}
