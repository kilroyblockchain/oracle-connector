import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  scope: string;

  @IsNotEmpty()
  @IsString()
  grantType: string;
}
