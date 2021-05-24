export interface CurrentUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  authorities: string[];
  institutionId: number;
  studentId?: number;
  teacherId?: number;
  fullName(): string;
}
