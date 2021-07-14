import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Student } from 'src/app/model/student/student';
import { StudentsService } from 'src/app/services/students.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: '[student]',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  editMode: boolean = false;

  originalStudent!: Student;
  student!: Student;

  showEnrollments: boolean = false;
  showTransactions: boolean = false;
  showDocuments: boolean = false;

  constructor(private route: ActivatedRoute, private studentService: StudentsService) { }

  fetchStudent(): void {
    const studentId: number = this.route.snapshot.params.id;

    this.studentService.getStudent(studentId).pipe(take(1)).subscribe((student: Student) => {
      this.originalStudent = student;
      this.student = {
        ...student,
        user: {...student.user}
      };
    });
  }

  ngOnInit(): void {
    this.fetchStudent();
  }

  onCancel(form: NgForm): void {
    this.editMode = false;
    form.resetForm({ ...this.originalStudent, user: {...this.originalStudent.user} });
  }

  submit(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.valid) {
      this.studentService
            .updateStudent(this.originalStudent.id!, this.student)
            .pipe(take(1))
            .subscribe(() => {
              this.originalStudent = { ...this.student, user: {...this.student.user} };
              this.editMode = false;
            });
    }
  }
}
