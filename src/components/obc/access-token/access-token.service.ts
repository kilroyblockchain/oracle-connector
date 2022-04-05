import {
  BadRequestException,
  CACHE_MANAGER,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AccessTokenDto } from './dto/access-token.dto';
import axios, { AxiosError } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
import { Cache } from 'cache-manager';

const OBC_ADMIN_HOST = process.env.OBC_ADMIN_HOST;
const AUTHORIZATION_TOKEN = process.env.AUTHORIZATION_TOKEN;

@Injectable()
export class AccessTokenService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generateAccessToken(accessTokenDto: AccessTokenDto) {
    const logger = new Logger('GenerateAccessToken');

    const params = new URLSearchParams();
    params.append('grant_type', accessTokenDto.grantType);
    params.append('username', accessTokenDto.userName);
    params.append('password', accessTokenDto.password);
    params.append('scope', accessTokenDto.scope);
    let accessToken = null;
    try {
      const cacheValue = await this.cacheManager.get(accessTokenDto.userName);
      if (cacheValue) {
        accessToken = cacheValue;
      } else {
        const response = await axios.post(
          OBC_ADMIN_HOST + '/oauth2/v1/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + AUTHORIZATION_TOKEN,
            },
          },
        );
        await this.cacheManager.set(
          accessTokenDto.userName,
          response.data.access_token,
          { ttl: response.data.expires_in },
        );
        accessToken = response.data.access_token;
      }

      return {
        access_token: accessToken,
      };
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
}
