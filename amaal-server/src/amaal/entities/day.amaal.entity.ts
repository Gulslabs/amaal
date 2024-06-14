import { BaseEntity } from 'src/shared/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class DayAmaal extends BaseEntity {
  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column('simple-json')
  amaals: {
    category: string;
    kind: string;
    perfomed: boolean;
    duration: number;
  }[];
}
