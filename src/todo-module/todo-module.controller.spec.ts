import { Test, TestingModule } from '@nestjs/testing';
import { TodoModuleController } from './todo-module.controller';

describe('TodoModuleController', () => {
  let controller: TodoModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoModuleController],
    }).compile();

    controller = module.get<TodoModuleController>(TodoModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
