import { Injectable } from '@nestjs/common';


import { InjectRepository } from "@nestjs/typeorm";
import { ToDoEntity } from "../entities/ToDoEntity";
import { SearchTodoDto } from 'src/todo-module/dto/search-todo.dto';
import { TodoStatusEnum } from '../todo-module/todo-status-enum';
import { Repository, Like, Brackets } from "typeorm";

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

    async countByStatus2(): Promise<Object> {
        const qb = this.toDoRepository.createQueryBuilder('todo');
        qb
        .select("todo.status, count(todo.id) as nbTodos")
        .groupBy("todo.status")

        console.log(qb.getSql());

        return await qb.getRawMany();
    }

    async findByCriteriaOrStatus(searchQuery: SearchTodoDto): Promise<ToDoEntity[]> {
        // SANS QUERY BUILDER

        // OR OR OR 
        // return await this.toDoRepository.find({
        //     where: [
        //         { description: Like(`%${searchQuery.criteria}%`) },
        //         { name: Like(`%${searchQuery.criteria}%`) },
        //         { status: searchQuery.status }
        //     ]    
        // });
        // OR OR AND

        // AVEC QUERY BUILDER
        return await this.toDoRepository
            .createQueryBuilder('todo')
            // .where(
            //     [
            //         { description: Like(`%${searchQuery.criteria}%`) },
            //         { name: Like(`%${searchQuery.criteria}%`) }
            //     ]
            // )
            .where('todo.status = :status', { status: searchQuery.status })
            .andWhere(new Brackets(qb => {
                qb
                .where("todo.description like :criteria", { criteria: searchQuery.criteria })
                .orWhere("todo.name like :criteria", { criteria: searchQuery.criteria })
            }))
            .take(7)
            .skip(0)
            .getMany()
    }
}
