import { IsString, IsEmail, IsNotEmpty, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Injectable } from 'src/main';

@Injectable()
export class ValidationService {
  async validateEmail(input: string): Promise<string | null> {
    try {
      const emailValidationObject = plainToClass(EmailValidationDto, {
        email: input,
      });
      await validate(emailValidationObject);
      return null; // Validation successful
    } catch (errors) {
      return errors[0].constraints
        ? errors[0].constraints[Object.keys(errors[0].constraints)[0]]
        : 'Invalid input';
    }
  }
}

// DTO (Data Transfer Object)
class EmailValidationDto {
  @IsString({ message: 'Input should be a string' })
  @IsNotEmpty({ message: 'Input should not be empty' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}
