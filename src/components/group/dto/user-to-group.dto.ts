import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserToGroupDto {
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly groupId: string;
}
