import { Course } from "../course/course";
import { Student } from "./student";

export interface Enrollment {
    id?: number,
    startDate: Date,
    passed: boolean,
    score: number,
    grade: number,
    course: Course,
    student: Student
}