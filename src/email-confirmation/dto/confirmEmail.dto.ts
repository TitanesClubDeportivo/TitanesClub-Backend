import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
                
export class ConfirmEmailDto {

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ResendConfirmationLinkDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
