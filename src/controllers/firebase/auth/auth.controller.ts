import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthService } from 'src/services/firebase/auth/auth.service';

class SignupDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

class SignInDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) signupDto: SignupDto,
  ): Promise<{ userId: string }> {
    try {
      const userId = await this.authService.signUp(
        signupDto.email,
        signupDto.password,
      );
      return { userId };
    } catch (error) {
      throw new HttpException('Failed to sign up', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) signInDto: SignInDto,
  ): Promise<{ token: string }> {
    try {
      const token = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      return { token };
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
