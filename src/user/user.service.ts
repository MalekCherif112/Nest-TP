import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { CrudService } from '../common/service/crud.service';
import {User} from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){
    super(userRepository)
  }
}
