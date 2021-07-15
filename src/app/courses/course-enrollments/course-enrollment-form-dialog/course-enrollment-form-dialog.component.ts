import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/model/course/course';
import { Student } from 'src/app/model/student/student';

export interface CourseEnrollmentFormDialogOptions {
  course: Course,
  cancel: () => void,
  save: (enrollment: any) => void
}


@Component({
  selector: 'course-enrollment-form-dialog',
  templateUrl: './course-enrollment-form-dialog.component.html',
  styleUrls: ['./course-enrollment-form-dialog.component.css']
})
export class CourseEnrollmentFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('options') options!: CourseEnrollmentFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  enrollment: any = {
    student: {
      id: 0,
      firstName: '',
      lastName: '',
      studentCard: '',
      address: '',
      generation: 0,
      dateOfBirth: new Date(''),
      user: {
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        institution: {
          id: 0,
          name: '',
          address: ''
        }
      },
      institution: {
        id: 0,
        name: '',
        address: ''
      },
      finacialCard: {
        id: 0,
        currentAmmount: 0,
        totalDeposit: 0,
        totalSpent: 0
      }
    }
  };

  selectStudentDialogOpened: boolean = false;

  onStudentSelected(student: Student): void {
    this.enrollment.student = {...student};
    this.selectStudentDialogOpened = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.opened && !changes.opened.firstChange && !changes.opened.currentValue) {
      setTimeout(() => {
        this.form.resetForm();
        this.enrollment = {
          student: {
            id: 0,
            firstName: '',
            lastName: '',
            studentCard: '',
            address: '',
            generation: 0,
            dateOfBirth: new Date(''),
            user: {
              id: 0,
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              institution: {
                id: 0,
                name: '',
                address: ''
              }
            },
            institution: {
              id: 0,
              name: '',
              address: ''
            },
            finacialCard: {
              id: 0,
              currentAmmount: 0,
              totalDeposit: 0,
              totalSpent: 0
            }
          }
        };
      }, 300);
    }
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.enrollment.student.id) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.enrollment);
    }
  }

}
