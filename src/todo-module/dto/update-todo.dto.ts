import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../todo-status-enum';
import { TodoDto } from './add-todo.dto';

export class UpdateTodoDto extends PartialType( TodoDto )  {

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}