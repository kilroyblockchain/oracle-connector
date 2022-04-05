import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { Response } from 'src/@core/common/dto/response.dto';
import { UserToGroupDto } from './dto/user-to-group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/all')
  // @UseGuards(AuthorizationGuard)
  async getGroupList() {
    return new Response(
      'Group List Fetched Successfully',
      await this.groupService.getGroupList(),
    ).setStatusCode(HttpStatus.OK);
  }

  @Post('/add-user')
  // @UseGuards(AuthorizationGuard)
  async addUserToGroup(@Body() userToGroupDto: UserToGroupDto) {
    const addUserToGroupRes = await this.groupService.addUserToGroup(
      userToGroupDto.userName,
      userToGroupDto.groupId,
    );
    console.log(addUserToGroupRes);
    return new Response('User Added To Group Successfully', {
      groupName: addUserToGroupRes.displayName,
    }).setStatusCode(HttpStatus.OK);
  }
}
