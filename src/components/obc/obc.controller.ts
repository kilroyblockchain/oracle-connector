import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOBCUserDto } from './dto/create-obc-user.dto';
import { GrantAppRoleDto } from './dto/grant-app-role.dto';
import { OBCService } from './obc.service';

@Controller('obc')
export class OBCController {
  constructor(private readonly obcService: OBCService) {}

  @Post('create-user')
  async createUser(@Body() createOBCUserDto: CreateOBCUserDto) {
    return await this.obcService.createOBCUser(createOBCUserDto);
  }
}
