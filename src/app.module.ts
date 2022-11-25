import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo-module/todo-module.module';
import { TodoModuleController } from './todo-module/todo-module.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/ToDoEntity';

import { Cv } from './cv/entities/cv.entity';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';

import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';

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
        autoLoadEntities:true,
        logging:true,
        synchronize: true,
      }
    ),
    CvModule,
    SkillModule,
    UserModule
  ],
  controllers: [AppController, TodoModuleController],
  providers: [AppService],
})
export class AppModule { }
