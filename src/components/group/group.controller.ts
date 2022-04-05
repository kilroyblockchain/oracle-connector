import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'src/@core/common/dto/response.dto';
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
}
