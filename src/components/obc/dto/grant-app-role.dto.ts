import { IsNotEmpty, IsString } from 'class-validator';

export class GrantAppRoleDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  appId: string;

  @IsNotEmpty()
  @IsString()
  appRoleId: string;
}
