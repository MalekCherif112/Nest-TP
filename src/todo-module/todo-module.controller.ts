import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TodoModel } from './todo-model';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';

@Controller()
export class TodoModuleController {

  private todos = [];

  @Get('getToDos')
  getToDos() {
    return this.todos;
  }

  @Post('addToDo')
  addToDo(@Body() todo: TodoDto) {
    const newToDO = new TodoModel(todo.name, todo.description);
    this.todos.push(newToDO);
    return newToDO;
  }

  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    const todo = this.todos.find((todo) => todo.id == id);

    if (todo) return todo
    else throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  @Delete('/deleteById/:id')
  deleteById(@Param('id') id: string) {
    const newTODOS = this.todos.filter((todo) => todo.id !== id);

    this.todos = newTODOS;
    return this.todos;
  }

  @Put('/updateById/:id')
  updateById(@Body() updatedToDo: UpdateTodoDto, @Param('id') id: string) {
    const todo = this.todos.find((todo) => todo.id == id);

    if (todo) {
      if (updatedToDo.name) todo.name = updatedToDo.name;

      if (updatedToDo.description) todo.description = updatedToDo.description;

      if (updatedToDo.status) todo.status = updatedToDo.status;
    }
    else throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);

    return todo;
  }
}
