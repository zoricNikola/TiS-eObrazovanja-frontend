import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Student } from 'src/app/model/student/student';
import { StudentsService } from 'src/app/services/students.service';

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

  ngOnInit(): void {
    const studentId: number = this.route.snapshot.params.id;

    this.studentService.getStudent(studentId).pipe(take(1)).subscribe((student: Student) => {
      this.originalStudent = student;
      this.student = {
        ...student,
        user: {...student.user}
      };
    });
  }

  onCancel(): void {
    this.editMode = false;
  }

  submit(): void {}

}
