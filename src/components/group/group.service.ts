import { Injectable, NotFoundException } from '@nestjs/common';
import { OBCService } from '../obc/obc.service';

@Injectable()
export class GroupService {
  constructor(private readonly obcService: OBCService) {}

  async getGroupList() {
    return await this.obcService.getAllGroup();
  }

  async addUserToGroup(userName: string, groupId: string) {
    const userDetails = await this.obcService.searchUserByUserName(userName);
    if (userDetails.totalResults == 0) {
      throw new NotFoundException('User Not Found');
    }
    const userId = userDetails.Resources[0].id;
    return await this.obcService.addUserToGroup(groupId, userId);
  }
}
