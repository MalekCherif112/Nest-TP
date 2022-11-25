import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { SkillService } from "../skill/skill.service";
import { UserService } from "../user/user.service";
import { CvService } from "../cv/cv.service";
import { Skill } from "../skill/entities/skill.entity";
import { User } from "../user/entities/user.entity";
import { Cv } from "../cv/entities/cv.entity";
import { randSkill, randFirstName, randJobTitle, randEmail } from '@ngneat/falso';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const skillService = app.get(SkillService);
    const cvService = app.get(CvService);
    const userService = app.get(UserService);

    const skills: Skill[] =[];

    for (let i = 0; i < 50; i++) {

        const skill = new Skill();
        const user = new User();
      
        user.email= randEmail();
        skill.designation=randSkill();

        skills[i]= skill

        await skillService.create(skill);
        await userService.create(user);

    }

    for (let i = 0; i < 50; i++) {

        const cv = new Cv();
    
        cv.firstName = randFirstName();
        cv.job = randJobTitle();
        cv.skills = skills;
        
        await cvService.create(cv);

    }

    await app.close();
}

bootstrap();