import { IsEmail, IsNotEmpty } from 'class-validator';

/***
 * Class for validating log in credentials
 */
export class LoginCredentialsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
