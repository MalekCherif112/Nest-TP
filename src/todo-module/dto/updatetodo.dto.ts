import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatusEnum } from '../todo-status-enum';

export class UpdateTodoDto  {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}