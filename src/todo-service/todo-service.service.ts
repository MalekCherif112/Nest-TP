import { Injectable } from '@nestjs/common';


import { InjectRepository } from "@nestjs/typeorm";
import { ToDoEntity } from "src/entities/ToDoEntity";
import { SearchTodoDto } from 'src/todo-module/dto/search-todo.dto';
import { TodoStatusEnum } from 'src/todo-module/todo-status-enum';
import { Repository, Like } from "typeorm";

@Injectable()
export class ToDoService {
    constructor(
        @InjectRepository(ToDoEntity)
        public readonly toDoRepository: Repository<ToDoEntity>,
    ) { }

    async countByStatus(status: TodoStatusEnum): Promise<number> {
        return await this.toDoRepository.count({
            where: {
                status: status
            },
        });
    }

    async findByCriteriaOrStatus(searchQuery: SearchTodoDto): Promise<ToDoEntity[]> {
        // OR OR OR 
        // return await this.toDoRepository.find({
        //     where: [
        //         { description: Like(`%${searchQuery.criteria}%`) },
        //         { name: Like(`%${searchQuery.criteria}%`) },
        //         { status: searchQuery.status }
        //     ]    
        // });
        // OR OR AND
        return await this.toDoRepository
            .createQueryBuilder('todo')
            .where(
                [
                    { description: Like(`%${searchQuery.criteria}%`) },
                    { name: Like(`%${searchQuery.criteria}%`) }
                ]
            )
            .andWhere('todo.status = :status', { status: searchQuery.status })
            .take(7)
            .skip(0)
            .getMany()  
    }
}
