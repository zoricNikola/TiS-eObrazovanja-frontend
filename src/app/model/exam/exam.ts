import {Course} from '../course/course';
import {ExamPeriod} from '../exam-period/exam-period';

export interface Exam{
  id?: number;
  dateTime: Date;
  course: Course;
  description: string;
  classroom: string;
  points?: number;
  examPeriod: ExamPeriod;
}
