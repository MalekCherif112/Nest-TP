import { v4 as uuidv4 } from 'uuid';
import { TodoStatusEnum } from './todo-status-enum';

export class TodoModel {
  constructor(
    public name: string = '',
    public description: string = '',
    public id: string = uuidv4(),
    public creationDate: Date = new Date(),
    public status: string = TodoStatusEnum.waiting,
  ) {}
}