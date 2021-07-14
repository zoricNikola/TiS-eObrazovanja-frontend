import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StudentsService } from 'src/app/services/students.service';
import { EnrollmentPage } from './../../../model/student/enrollment-page';
import { EnrollmentService } from './../../../services/enrollment.service';
import { SortParamsUtils } from './../../../services/utils/sort-params-utils.service';
import { switchMap, take } from 'rxjs/operators';
import { PageParams } from 'src/app/model/http/page-params';
import { StudentEnrollmentFormDialogOptions } from './student-enrollment-form-dialog/student-enrollment-form-dialog.component';
import { Student } from './../../../model/student/student';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: '[student-enrollments]',
  templateUrl: './student-enrollments.component.html',
  styleUrls: ['./student-enrollments.component.css']
})
export class StudentEnrollmentsComponent implements OnInit {
  @Input("studentX") student!: Student;

  enrollmentsQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: []
  });
  enrollmentsPage$: Observable<EnrollmentPage> = of();

  constructor(private enrollmentService: EnrollmentService, 
      private studentService: StudentsService, public sortParamsUtils: SortParamsUtils, 
      public authService: AuthService) { }

  ngOnInit(): void {
    this.enrollmentsPage$ = this.enrollmentsQueryMap.pipe(switchMap((paramMap) => {
      const pageParams: PageParams = new PageParams(
        paramMap.page,
        paramMap.size
      );

      const queryParams = {
        sort: paramMap.sort,
      };

      return this.studentService.filterEnrollments(this.student.id!, pageParams, queryParams);
    }))
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    let newSortParams = this.sortParamsUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );
    
    this.enrollmentsQueryMap.next({
      ...this.enrollmentsQueryMap.value,
      sort: newSortParams
    });
  }

  onPageChange(selectedPage: number): void {
    this.enrollmentsQueryMap.next({
      ...this.enrollmentsQueryMap.value,
      page: selectedPage
    });
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.enrollmentsQueryMap.next({
      ...this.enrollmentsQueryMap.value,
      size: selectedPageSize
    });
  }

  enrollmentFormDialogOpened: boolean = false;
  enrollmentFormDialogOptions: StudentEnrollmentFormDialogOptions = {
    student: this.student,
    cancel: () => {},
    save: (enrollment: any) => {}
  };

  onNewEnrollmentClick(): void {
    this.enrollmentFormDialogOpened = true;

    this.enrollmentFormDialogOptions = {
      student: this.student,
      cancel: () => this.enrollmentFormDialogOpened = false,
      save: (enrollment: any) => {
        this.enrollmentService.createEnrollment(
          {...enrollment, student: this.student}
        ).pipe(take(1)).subscribe((id) => {
          this.enrollmentFormDialogOpened = false;

          this.enrollmentsQueryMap.next({
            ...this.enrollmentsQueryMap.value,
            r: 'r'
          });
        });
      }
    };
  }

}
