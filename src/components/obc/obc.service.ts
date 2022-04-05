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

  async activateUser(userName: string) {
    const activateUserRequest = {
      mappingAttribute: 'userName',
      mappingAttributeValue: userName,
      includeMemberships: true,
      schemas: ['urn:ietf:params:scim:schemas:oracle:idcs:Asserter'],
    };
    return await this.obcAccessService.postOBC(
      OBC_API.USER_ACTIVATION,
      activateUserRequest,
    );
  }

  async deactivateUser(userName: string) {
    const deactivateUserRequest = {
      active: false,
      schemas: ['urn:ietf:params:scim:schemas:oracle:idcs:UserStatusChanger'],
    };
    return await this.obcAccessService.putOBC(
      OBC_API.USER_DEACTIVATE + '/' + userName,
      deactivateUserRequest,
    );
  }

  async getBCAppInfo() {
    const getAppInfoRequest = {
      schemas: ['urn:ietf:params:scim:api:messages:2.0:SearchRequest'],
      attributes: ['displayName', 'active'],
      filter: 'displayName co "' + OBC_BLOCKCHAIN_NAME + '"',
      sortBy: 'displayName',
      startIndex: 1,
      count: 10,
    };
    return await this.obcAccessService.postOBC(
      OBC_API.GET_APP_INFO,
      getAppInfoRequest,
    );
  }

  async getBCAppRoleByAppId(appId: string) {
    return await this.obcAccessService.getOBC(
      OBC_API.GET_APP_ROLE + '"' + appId + '"',
    );
  }

  async grantAppRoleToUser(grantAppRoleDto: GrantAppRoleDto) {
    const grantAppRoleRequest = {
      grantee: {
        type: 'User',
        value: grantAppRoleDto.userId,
      },
      app: {
        value: grantAppRoleDto.appId,
      },
      entitlement: {
        attributeName: 'appRoles',
        attributeValue: grantAppRoleDto.appRoleId,
      },
      grantMechanism: 'ADMINISTRATOR_TO_USER',
      schemas: ['urn:ietf:params:scim:schemas:oracle:idcs:Grant'],
    };
    return await this.obcAccessService.postOBC(
      OBC_API.GRANT_APP_ROLE,
      grantAppRoleRequest,
    );
  }

  async changeUserPassword(userId: string, password: string) {
    const resetUserRequest = {
      password: password,
      schemas: ['urn:ietf:params:scim:schemas:oracle:idcs:UserPasswordChanger'],
    };

    return await this.obcAccessService.putOBC(
      OBC_API.CHANGE_PASSWORD + '/' + userId,
      resetUserRequest,
    );
  }
}
