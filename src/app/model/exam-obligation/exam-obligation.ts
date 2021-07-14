import {Course} from '../course/course';
import {ExamObligationType} from './exam-obligation-type';

export interface ExamObligation{
  id?: number;
  points?: number;
  description: string;
  examObligationType: ExamObligationType;
  course: Course;
}
