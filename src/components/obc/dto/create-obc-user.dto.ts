import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOBCUserDto {
  userName: string;

  firstName: string;

  lastName: string;

  email: string;

  password: string;
}
