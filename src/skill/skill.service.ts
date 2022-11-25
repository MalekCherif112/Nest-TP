import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { CrudService } from '../common/service/crud.service';
import {Skill} from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService extends CrudService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>
  ){
    super(skillRepository)
  }
}

