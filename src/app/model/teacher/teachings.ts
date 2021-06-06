import {Teacher} from './teacher';
import {TeacherRole} from './teacher-role';

export interface Teachings {
  id?: number;
  startDate: Date;
  teacher: Teacher;
  teacherRole: TeacherRole;
}
