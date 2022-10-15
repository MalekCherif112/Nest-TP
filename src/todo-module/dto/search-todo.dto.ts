import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../todo-status-enum';

export class SearchTodoDto {

  @IsString()
  @IsOptional()
  criteria: string;

  @IsEnum(TodoStatusEnum)
  @IsOptional()
  status: TodoStatusEnum;
}