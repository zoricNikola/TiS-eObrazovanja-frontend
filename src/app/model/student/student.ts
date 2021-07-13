import { Institution } from './../institution';
import { User } from './../user/user';
import { FinancialCard } from './financial-card';

export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  studentCard: string;
  address: string;
  generation: number;
  dateOfBirth: Date;
  user: User;
  institution?: Institution;
  financialCard?: FinancialCard;
}
