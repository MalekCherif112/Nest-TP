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
  NotFoundException,
  Version,
  Query,
  Inject,
  Patch,
} from '@nestjs/common';
import { TodoModel } from './todo-model';
import { TodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ToDoService } from '../todo-service/todo-service.service';
import { ToDoEntity } from '../entities/ToDoEntity';
import { TodoStatusEnum } from './todo-status-enum';
import { SearchTodoDto } from './dto/search-todo.dto';

@Controller({
  path: 'todo',
  version: "2"
})
export class TodoModuleController {

  constructor(
    private toDoService: ToDoService
  ) {}

  private todos = [];

  @Get()
  @Version("1")
  getToDos() {
    return this.todos;
  }

  @Get('')
  @Version("2")
  async getToDos2 (@Query() searchQuery: SearchTodoDto) {

    return await this.toDoService.findByCriteriaOrStatus(searchQuery);
  }

  @Get('/count')
  @Version("2")
  async countByStatus() {

    const waitingTodos = await this.toDoService.countByStatus(TodoStatusEnum.waiting);
    const doneTodos = await this.toDoService.countByStatus(TodoStatusEnum.done);
    const actifTodos = await this.toDoService.countByStatus(TodoStatusEnum.actif);

    return {
      waitingTodos,
      doneTodos,
      actifTodos
    }
  }

  @Get('/count2')
  @Version("2")
  //Another method with querbuilder
  async countByStatus2() {
    return this.toDoService.countByStatus2();
  }

  @Post()
  @Version("1")
  addToDo(@Body() todo: TodoDto) {
    const newToDO = new TodoModel(todo.name, todo.description);

    //we could instead of uuid(), increment the index of the new to do 
    //const newToDo = new TodoModel()
    // const { name, description } = todo
    // newToDO.name = name;
    // newToDO.description = description;
    // if (this.todos.length){
    //   newToDO.id = this.todos[this.todos.length - 1] + 1;
    // }
    // else newToDO.id = 1;

    this.todos.push(newToDO);
    return newToDO;
  }

  @Post()
  @Version("2")
  async addToDo2(@Body() todo: ToDoEntity) {
    return await this.toDoService.toDoRepository.save(todo);
  }

  @Get('/:id')
  @Version("1")
  getById(@Param('id') id: string) {
    const todo = this.todos.find((todo) => todo.id == id);

    // const todo = this.todos.find((todo) => todo.id ===  +id);
    // if we declared the id in the model as a number, with the === that checks also
    //the type we should add+ to convert the id string to a number

    if (todo) return todo
    else throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    // else throw new NotFoundException(`Todo with id ${id} not found`);
  }

  @Get('/:id')
  @Version("2")
  async getById2(@Param('id') id: number) {
    const todo = await this.toDoService.toDoRepository.findOne({ where: { id: id } });

    if (todo) return todo;
    else throw new NotFoundException(`Todo with id ${id} not found`);
  }

  @Delete('/:id')
  @Version("1")
  deleteById(@Param('id') id: string) {
    const newTODOS = this.todos.filter((todo) => todo.id !== id);

    this.todos = newTODOS;
    return this.todos;
    //METHOD2
    //const index = this.todos.findIndex((todo) => todo.id === id)
    // if (index >= 0){
    //   this.todo.slice(index, 1)
    // }
    // else throw new NotFoundException(`Todo with id ${id} not found`);
    // return {"message": `to do with id ${id} deleted`}
  }

  @Delete('/:id')
  @Version("2")
  async deleteById2(@Param('id') id: number) {
    // const data = await this.toDoService.toDoRepository.delete({id});
    const data = await this.toDoService.toDoRepository.softDelete({id});

    if (data.affected)
      return {
        statusCode: HttpStatus.OK,
        message: 'todo deleted successfully',
      };
    return {
      message: `toDo with id ${id} is not found`,
    };
  }

  @Put('/:id/restore')
  @Version("2")
  async restoreById(@Param('id') id: number) {
    const data = await this.toDoService.toDoRepository.restore({id});

    if (data.affected)
      return {
        statusCode: HttpStatus.OK,
        message: `todo with ${id} is successfully restored`
      };
    return {
      message: `toDo with id ${id} is not found`,
    };
  }

  @Put('/:id')
  @Version("1")
  updateById(@Body() updatedToDo: UpdateTodoDto, @Param('id') id: string) {
    // updateById(@Body() todo: Partial<UpdateTodoDto>, @Param('id') id: string) {
    // Partial<Type>
    // Constructs a type with all properties of Type set to optional
    const todo = this.todos.find((todo) => todo.id == id);

    if (todo) {
      if (updatedToDo.name) todo.name = updatedToDo.name;
      //todo.name = updatedToDo.name ? updatedToDo.name : todo.name

      if (updatedToDo.description) todo.description = updatedToDo.description;

      if (updatedToDo.status) todo.status = updatedToDo.status;
    }
    else throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);

    return todo;

    // const toUpdateTodo = this.getById(id); //this function will throw itself an error if todo not found

    // with thid method: I am altering the refrence of the object => the object that we want 
    // to update will not be modified
    // toUpdateTodo = {
    //   ...toUpdateTodo,
    //   ...todo
    // }

  }

  @Put('/:id')
  @Version("2")
  async updateById2(@Body() updatedToDo: ToDoEntity, @Param('id') id: number) {

    const data = await this.toDoService.toDoRepository.update(id, updatedToDo);

    if (data.affected)
      return {
        statusCode: HttpStatus.OK,
        message: 'todo updated successfully',
      };
    
    return {
      message: `toDo with id ${id} is not found`,
    };
  }

}
