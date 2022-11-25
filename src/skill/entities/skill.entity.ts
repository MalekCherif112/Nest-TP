import { Cv } from '../../cv/entities/cv.entity';
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity } from 'typeorm';
import { DateGenerator } from "../../date-generator";

@Entity('skill')
export class Skill extends DateGenerator {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @ManyToMany(() => Cv, (cv: Cv) => cv.skills)
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })

  cvs: Cv[];
}