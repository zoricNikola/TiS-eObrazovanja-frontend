import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from './../model/student/student';
import { AuthService } from './../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css'],
})
export class EnrollmentsComponent implements OnInit {
  student!: Student;

  constructor(
    private authService: AuthService,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    const studentId: number = this.authService.currentUser?.studentId!;

    this.studentService
      .getStudent(studentId)
      .pipe(take(1))
      .subscribe((student: Student) => {
        this.student = student;
      });
  }
}
