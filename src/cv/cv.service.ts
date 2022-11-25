import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/service/crud.service';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CvService extends CrudService<Cv>{
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>
  ){
    super(cvRepository)
  }
 
}
