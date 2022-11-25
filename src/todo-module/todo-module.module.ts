import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from '../entities/ToDoEntity';
import { ToDoService } from '../todo-service/todo-service.service';
import { TodoModuleController } from './todo-module.controller';

@Module({
  controllers: [TodoModuleController],
  imports: [
    TypeOrmModule.forFeature([ToDoEntity])
  ],
  providers: [ToDoService],
  exports: [ToDoService]
})
export class TodoModuleModule {}
