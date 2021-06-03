import { User } from '../user/user';
import { TeacherTitle } from './teacher-title';
import { Institution } from './../institution';

export interface Teacher {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: Date;
  teacherTitle: TeacherTitle;
  user: User;
  institution?: Institution;
}
