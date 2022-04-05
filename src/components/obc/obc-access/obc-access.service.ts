import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
const OBC_ADMIN_HOST = process.env.OBC_ADMIN_HOST;

@Injectable()
export class OBCAccessService {
  async postOBC(apiUrl: string, body: any, headers?: any, host?: string) {
    const logger = new Logger('PostOBC');
    if (!headers) {
      headers = {
        'Content-Type': 'application/json',
      };
    }
    if (!host) {
      host = OBC_ADMIN_HOST;
    }
    try {
      const response = await axios.post(host + apiUrl, body, {
        headers: headers,
      });
      if (response.data.result) {
        return response.data.result.payload === ''
          ? null
          : response.data.result.payload;
      } else {
        return response.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.status) {
        logger.error(error);
        throw error;
      }
      const err = error as AxiosError;
      logger.error(JSON.stringify(err.response.data));
      if (err.response && err.response.status == HttpStatus.CONFLICT) {
        throw new ConflictException([err.response.data.detail]);
      } else {
        throw new InternalServerErrorException(['Something Went Wrong']);
      }
    }
  }

  async getOBC(apiUrl: string) {
    const logger = new Logger('GetOBC');
    try {
      const response = await axios.get(OBC_ADMIN_HOST + apiUrl, {});
      return response.data;
    } catch (error) {
      logger.error(error);
      if (error.status) {
        logger.error(error);
        throw error;
      }
      const err = error as AxiosError;
      logger.error(JSON.stringify(err.response.data));
      if (err.response && err.response.status == HttpStatus.CONFLICT) {
        throw new ConflictException([err.response.data.detail]);
      } else {
        throw new InternalServerErrorException(['Something Went Wrong']);
      }
    }
  }

  async putOBC(apiUrl: string, body: any) {
    const logger = new Logger('PutOBC');
    try {
      const response = await axios.put(OBC_ADMIN_HOST + apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      if (error.status) {
        logger.error(error);
        throw error;
      }
      const err = error as AxiosError;
      logger.error(JSON.stringify(err.response.data));
      if (err.response && err.response.status == HttpStatus.CONFLICT) {
        throw new ConflictException([err.response.data.detail]);
      } else {
        throw new InternalServerErrorException(['Something Went Wrong']);
      }
    }
  }
}
