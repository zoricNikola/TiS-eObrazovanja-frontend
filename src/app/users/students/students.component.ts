import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/model/student/student';
import { StudentPage } from './../../model/student/student-page';
import { StudentsService } from './../../services/students.service';
import { SortParamsUtils } from './../../services/utils/sort-params-utils.service';
import { switchMap, take } from 'rxjs/operators';
import { PageParams } from './../../model/http/page-params';
import { StudentFormDialogOptions } from './student-form-dialog/student-form-dialog.component';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { ConfirmationDialogOptions } from './../../common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: '[students]',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  @Input('selectable') selectable: boolean = false;
  @Output('itemTake') studentTake: EventEmitter<Student> = new EventEmitter();

  selectedStudent: Student | undefined = undefined;

  studentsPage$: Observable<StudentPage> = of();

  showSearchBox: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    public sortParamsUtils: SortParamsUtils
  ) {}

  ngOnInit(): void {
    this.studentsPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );

        let queryParams = {
          firstName: paramMap.get('firstName'),
          lastName: paramMap.get('lastName'),
          studentCard: paramMap.get('studentCard'),
          address: paramMap.get('address'),
          generationFrom: paramMap.get('generationFrom'),
          generationTo: paramMap.get('generationTo'),
          dateOfBirthFrom: paramMap.get('dateOfBirthFrom'),
          dateOfBirthTo: paramMap.get('dateOfBirthTo'),
          username: paramMap.get('username'),
          email: paramMap.get('email'),
          phoneNumber: paramMap.get('phoneNumber'),
          sort: paramMap.getAll('sort'),
        };

        return this.studentsService.filterStudents(pageParams, queryParams);
      })
    );
  }

  onPageChange(selectedPage: number): void {
    this.selectable ? (this.selectedStudent = undefined) : {};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: selectedPage === 1 ? null : selectedPage },
      queryParamsHandling: 'merge',
    });
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.selectable ? (this.selectedStudent = undefined) : {};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { size: selectedPageSize },
      queryParamsHandling: 'merge',
    });
  }

  onSearchOptionsChange(queryParams: any): void {
    this.selectable ? (this.selectedStudent = undefined) : {};
    for (let key of Object.keys(queryParams)) {
      if (!queryParams[key]) queryParams[key] = null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedStudent = undefined) : {};
    let newSortParams = this.sortParamsUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: newSortParams },
      queryParamsHandling: 'merge',
    });
  }

  onStudentSelect(student: Student): void {
    this.selectedStudent =
      this.selectedStudent === student ? undefined : student;
  }

  onStudentTake(): void {
    this.studentTake.emit(this.selectedStudent);
  }

  refreshStudentsPage(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
      },
      queryParamsHandling: 'merge',
    });
  }

  studentFormDialogOpened: boolean = false;
  studentFormDialogOptions: StudentFormDialogOptions = {
    state: FORM_STATE.ADD,
    studentForEdit: undefined,
    cancel: () => {},
    save: (student: Student) => {},
  };

  onNewStudentClick(): void {
    this.studentFormDialogOpened = true;

    this.studentFormDialogOptions = {
      state: FORM_STATE.ADD,
      studentForEdit: undefined,
      cancel: () => {
        this.studentFormDialogOpened = false;
      },
      save: (student: Student) => {
        this.studentsService
          .createStudent(student)
          .pipe(take(1))
          .subscribe((id) => {
            console.log('Created ', id);
            this.studentFormDialogOpened = false;
            this.refreshStudentsPage();
          });
      },
    };
  }

  onEditStudentClick(student: Student): void {
    this.studentFormDialogOpened = true;

    this.studentFormDialogOptions = {
      state: FORM_STATE.EDIT,
      studentForEdit: student,
      cancel: () => {
        this.studentFormDialogOpened = false;
      },
      save: (student: Student) => {
        this.studentsService
          .updateStudent(student.id!, student)
          .pipe(take(1))
          .subscribe(() => {
            console.log('Created ', student.id);
            this.studentFormDialogOpened = false;
            this.refreshStudentsPage();
          });
      },
    };
  }

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  onStudentDelete(student: Student): void {
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Delete ${student.user.username}`,
      message: 'Are you sure?',
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.studentsService
          .deleteStudent(student.id!)
          .pipe(take(1))
          .subscribe(() => {
            this.confirmationDialogOpened = false;
            this.refreshStudentsPage();
          });
      },
    };
  }
}
