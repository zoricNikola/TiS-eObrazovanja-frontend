import { Student } from './student';
import { Course } from './../course/course';

export interface Enrollment {
    id?: number;
    startDate?: Date;
    passed?: boolean;
    score?: number;
    grade?: number;
    student?: Student;
    course?: Course
}