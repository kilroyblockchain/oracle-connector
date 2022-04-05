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

  @Get('/activate-user/:userName')
  async activateUser(@Param('userName') userName: string) {
    return await this.obcService.activateUser(userName);
  }

  @Get('get-app-info')
  async getAppInfo() {
    return await this.obcService.getBCAppInfo();
  }

  @Get('get-app-role/:appId')
  async getAppRole(@Param('appId') appId: string) {
    return await this.obcService.getBCAppRoleByAppId(appId);
  }

  @Post('grant-app-role')
  async grantAppRoleToUser(@Body() grantAppRoleDto: GrantAppRoleDto) {
    return await this.obcService.grantAppRoleToUser(grantAppRoleDto);
  }
}
