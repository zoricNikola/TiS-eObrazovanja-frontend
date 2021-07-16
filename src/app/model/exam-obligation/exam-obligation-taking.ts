import { Enrollment } from '../student/enrollment';
import { ExamObligation } from './exam-obligation';

export interface ExamObligationTaking {
  id?: number;
  score: number;
  examObligation?: ExamObligation;
  enrollment?: Enrollment;
}
