import {Teacher} from './teacher';
import {TeacherRole} from './teacher-role';
import {Course} from '../course/course';

export interface Teaching {
  id?: number;
  startDate: Date;
  teacher?: Teacher;
  teacherRole: TeacherRole;
  course?: Course;
}
