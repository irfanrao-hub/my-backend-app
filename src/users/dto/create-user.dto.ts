import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
// import { Match } from 'src/common/decorators/match.decorator';
// 
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  googleId?: string; 

  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?\d{10,15}$/, { message: 'Invalid WhatsApp number format' })
  personalWhatsappNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
