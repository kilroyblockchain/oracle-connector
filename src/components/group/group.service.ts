import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateOBCUserDto } from '../obc/dto/create-obc-user.dto';
import { GrantAppRoleDto } from '../obc/dto/grant-app-role.dto';
import { OBCService } from '../obc/obc.service';
import { RegisterUserDto } from './dto/register-user.dto';
import axios, { AxiosError } from 'axios';

@Injectable()
export class GroupService {
  constructor(private readonly obcService: OBCService) {}

  async getGroupList() {
    const logger = new Logger('GetGroupList');

    return await this.obcService.getAllGroup();
  }
}
