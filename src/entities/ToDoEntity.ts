import { DateGenerator } from '../date-generator';
import { TodoStatusEnum } from '../todo-module/todo-status-enum';
import { Entity,Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

@Entity("todo")
export class ToDoEntity extends DateGenerator {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 10})
    name: string

    @Column({length: 10})
    description: string 

    @Column({
        type: "enum",
        enum: TodoStatusEnum
    })
    status: TodoStatusEnum

}
