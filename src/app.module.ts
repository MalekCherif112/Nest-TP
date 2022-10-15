import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo-module/todo-module.module';
import { TodoModuleController } from './todo-module/todo-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/ToDoEntity';
import { ToDoService } from './todo-service/todo-service.service';

@Module({
  imports: [PremierModule, TodoModuleModule,
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "todo",
        entities: [ToDoEntity],
        synchronize: true,
      }
    )
  ],
  controllers: [AppController, TodoModuleController],
  providers: [AppService],
})
export class AppModule { }
