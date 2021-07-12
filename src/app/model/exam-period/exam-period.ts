import { Institution } from "../institution";

export interface ExamPeriod{
    id?: number,
    name: string,
    startDate: Date,
    endDate: Date,
    institution?: Institution
}