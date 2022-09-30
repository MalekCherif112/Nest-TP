import { Module } from '@nestjs/common';
import { TodoModuleController } from './todo-module.controller';

@Module({
  controllers: [TodoModuleController],
})
export class TodoModuleModule {}
