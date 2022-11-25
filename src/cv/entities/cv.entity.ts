import { User } from './../../user/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  ManyToMany,
} from 'typeorm';
import { Skill } from '../../skill/entities/skill.entity';
import { DateGenerator } from '../../date-generator';

@Entity('cv')
export class Cv extends DateGenerator {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  age: number;

  @Column()
  Cin: number;
  
  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(() => User, (user: User) => user.cvs,  {eager:true})
  user: User;

  @ManyToMany(() => Skill, (skill: Skill) => skill.cvs, {eager:true})
  skills: Skill[];
}