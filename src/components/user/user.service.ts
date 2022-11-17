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
import { generateUniqueId } from 'src/@core/utils/helper';

@Injectable()
export class UserService {
  constructor(private readonly obcService: OBCService) {}

  async checkUser(userName: string) {
    const logger = new Logger('CheckUser');
    const OBC_ADMIN_HOST = process.env.OBC_ADMIN_HOST;
    const AUTHORIZATION_TOKEN = process.env.AUTHORIZATION_TOKEN;
    const REST_CLIENT_SCOPE = process.env.REST_CLIENT_SCOPE;

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', userName);
    params.append('password', userName);
    params.append('scope', REST_CLIENT_SCOPE);
    try {
      await axios.post(OBC_ADMIN_HOST + '/oauth2/v1/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + AUTHORIZATION_TOKEN,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      logger.error(JSON.stringify(err.response.data));
      if (err.response && err.response.status == HttpStatus.BAD_REQUEST) {
        throw new BadRequestException([err.response.data.error_description]);
      } else {
        throw new InternalServerErrorException(['Something Went Wrong']);
      }
    }
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const logger = new Logger('RegisterUser');
    const createOBCUserDto = new CreateOBCUserDto();
    createOBCUserDto.email = registerUserDto.email;
    createOBCUserDto.firstName = registerUserDto.firstName;
    createOBCUserDto.lastName = registerUserDto.lastName;
    createOBCUserDto.password = registerUserDto.password;
    createOBCUserDto.userName = registerUserDto.email;
    await this.obcService.createOBCUser(createOBCUserDto);
  }
}
