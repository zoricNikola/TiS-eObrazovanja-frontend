import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { AuthService } from './../services/auth.service';
import { take } from 'rxjs/operators';
import { Student } from './../model/student/student';

@Component({
  selector: 'app-financial-card',
  templateUrl: './financial-card.component.html',
  styleUrls: ['./financial-card.component.css'],
})
export class FinancialCardComponent implements OnInit {
  student!: Student;

  constructor(
    private authService: AuthService,
    private studentService: StudentsService
  ) {}

  fetchStudent(): void {
    const studentId: number = this.authService.currentUser?.studentId!;

    this.studentService
      .getStudent(studentId)
      .pipe(take(1))
      .subscribe((student: Student) => {
        this.student = student;
      });
  }

  ngOnInit(): void {
    this.fetchStudent();
  }
}
