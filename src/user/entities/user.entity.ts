import { DateGenerator } from '../../date-generator';
import { Cv } from '../../cv/entities/cv.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User extends DateGenerator {
    
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, (cv: Cv) => cv.user)
  cvs: Cv[]
}
