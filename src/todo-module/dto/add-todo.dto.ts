import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { isEmpty, IsMax } from '../todo-error-handler';

export class TodoDto {
  @IsString()
  @MaxLength(10, {
    message: IsMax(true)
  })
  @MinLength(3, {
    message: IsMax(false)
  })
  @IsNotEmpty({
    message: isEmpty
  })
  name: string;

  @IsNotEmpty({
    message:  isEmpty
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10,{
    message: IsMax(true)
  })
  description: string;
}