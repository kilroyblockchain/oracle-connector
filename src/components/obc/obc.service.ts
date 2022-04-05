import { Injectable } from '@nestjs/common';
import { OBC_API } from 'src/@core/constants/obc-api.constant';
import { generateUniqueId } from 'src/@core/utils/helper';
import { CreateOBCUserDto } from './dto/create-obc-user.dto';
import { GrantAppRoleDto } from './dto/grant-app-role.dto';
import { OBCAccessService } from './obc-access/obc-access.service';

const OBC_BLOCKCHAIN_NAME = process.env.OBC_BLOCKCHAIN_NAME;

@Injectable()
export class OBCService {
  constructor(private readonly obcAccessService: OBCAccessService) {}

  async createOBCUser(createOBCUserDto: CreateOBCUserDto) {
    const createUserRequest = {
      schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
      name: {
        givenName: createOBCUserDto.firstName,
        familyName: createOBCUserDto.lastName,
      },
      userName: createOBCUserDto.userName,
      emails: [
        {
          value: createOBCUserDto.email,
          type: 'work',
          primary: true,
        },
      ],
      password: createOBCUserDto.password,
    };
    return await this.obcAccessService.postOBC(
      OBC_API.CREATE_OBC_USER,
      createUserRequest,
    );
  }

  async getAllGroup() {
    const API_URL = OBC_API.GET_OBC_GROUP_LIST + '?attributes=displayName';
    return await this.obcAccessService.getOBC(API_URL);
  }

  async searchUserByUserName(userName: string) {
    const searchUserRequest = {
      schemas: ['urn:ietf:params:scim:api:messages:2.0:SearchRequest'],
      attributes: ['displayName', 'userName'],
      filter: 'userName sw "' + userName + '"',
      startIndex: 1,
      count: 1,
    };

    return await this.obcAccessService.postOBC(
      OBC_API.SEARCH_OBC_USER,
      searchUserRequest,
    );
  }
}
