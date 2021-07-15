import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ConfirmationDialogOptions } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { PageParams } from 'src/app/model/http/page-params';
import { Teacher } from 'src/app/model/teacher/teacher';
import { TeacherPage } from 'src/app/model/teacher/teacher-page';
import { TeachersService } from 'src/app/services/teachers.service';
import { SortParamsUtils } from 'src/app/services/utils/sort-params-utils.service';
import { TeacherFormDialogOptions } from './teacher-form-dialog/teacher-form-dialog.component';

@Component({
  selector: '[teachers]',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  @Input('selectable') selectable: boolean = false;
  @Output('itemTake') teacherTake: EventEmitter<Teacher> = new EventEmitter();

  teacherPage$: Observable<TeacherPage> = of();

  teachersQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: [],
    name: null
  });

  selectedTeacher: Teacher | undefined = undefined;

  showSearchBox: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    public sortParamsUtils: SortParamsUtils
  ) {}

  ngOnInit(): void {
    if (!this.selectable) {
      this.teacherPage$ = this.route.queryParamMap.pipe(
        switchMap((paramMap) => {
          let pageParams: PageParams = new PageParams(
            paramMap.get('page'),
            paramMap.get('size')
          );
          let queryParams = {
            firstName: paramMap.get('firstName'),
            lastName: paramMap.get('lastName'),
            username: paramMap.get('username'),
            address: paramMap.get('address'),
            teacherTitleName: paramMap.get('teacherTitle'),
            dateOfBirthFrom: paramMap.get('dateOfBirthFrom'),
            dateOfBirthTo: paramMap.get('dateOfBirthTo'),
            email: paramMap.get('email'),
            phoneNumber: paramMap.get('phoneNumber'),
            sort: paramMap.getAll('sort'),
          };
          return this.teachersService.filterTeachers(pageParams, queryParams);
        })
      );
    } else {
      this.teacherPage$ = this.teachersQueryMap.pipe(switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.page,
          paramMap.size
        );

        const queryParams = {
          sort: paramMap.sort,
          name: paramMap.name
        };

        return this.teachersService.filterTeachers(pageParams, queryParams);
      }));
    }
  }

  onTeacherSelect(teacher: Teacher): void {
    this.selectedTeacher =
      this.selectedTeacher === teacher ? undefined : teacher;
  }

  onTeacherTake(): void {
    let teacher: Teacher = {...this.selectedTeacher as Teacher};
    this.selectedTeacher = undefined;
    this.teacherTake.emit(teacher);
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedTeacher = undefined) : {};
    let newSortParams = this.sortParamsUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );

    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort: newSortParams },
        queryParamsHandling: 'merge',
      });
    } else {
      this.teachersQueryMap.next({
        ...this.teachersQueryMap.value,
        sort: newSortParams
      });
    }
  }

  onPageChange(selectedPage: number): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: selectedPage === 1 ? null : selectedPage },
        queryParamsHandling: 'merge',
      });
    } else {
      this.teachersQueryMap.next({
        ...this.teachersQueryMap.value,
        page: selectedPage
      });
    }
  }

  onPageSizeChange(selectedPageSize: number): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { size: selectedPageSize },
        queryParamsHandling: 'merge',
      });
    } else {
      this.teachersQueryMap.next({
        ...this.teachersQueryMap.value,
        size: selectedPageSize
      });
    }
  }

  onSearchOptionsChange(queryParams: any): void {
    for (const key of Object.keys(queryParams)) {
      if (!queryParams[key]) {
        queryParams[key] = null;
      }
    }

    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    } else {
      this.teachersQueryMap.next({
        ...this.teachersQueryMap.value,
        ...queryParams
      });
    }
  }

  refreshTeachersPage(): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.teachersQueryMap.next({
        ...this.teachersQueryMap.value,
        r: 'r'
      });
    }
  }

  teacherFormDialogOpened: boolean = false;
  teacherFormDialogOptions: TeacherFormDialogOptions = {
    state: FORM_STATE.ADD,
    teacherForEdit: undefined,
    cancel: () => {},
    save: (teacher: Teacher) => {},
  };

  onNewTeacherClick(): void {
    this.teacherFormDialogOpened = true;
    this.teacherFormDialogOptions = {
      state: FORM_STATE.ADD,
      teacherForEdit: undefined,
      cancel: () => (this.teacherFormDialogOpened = false),
      save: (teacher: Teacher) => {
        this.teachersService
          .createTeacher(teacher)
          .pipe(take(1))
          .subscribe((id) => {
            console.log('Created ', id);
            this.teacherFormDialogOpened = false;
            this.refreshTeachersPage();
          });
      },
    };
  }

  onEditTeacherClick(teacher: Teacher): void {
    this.teacherFormDialogOpened = true;
    this.teacherFormDialogOptions = {
      state: FORM_STATE.EDIT,
      teacherForEdit: teacher,
      cancel: () => (this.teacherFormDialogOpened = false),
      save: (teacher: Teacher) => {
        this.teachersService
          .updateTeacher(teacher.id!, teacher)
          .pipe(take(1))
          .subscribe(() => {
            console.log('Updated ', teacher.id);
            this.teacherFormDialogOpened = false;
            this.refreshTeachersPage();
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

  onTeacherDelete(teacher: Teacher): void {
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Delete ${teacher.user.username}`,
      message: 'Are you sure?',
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.teachersService
          .deleteTeacher(teacher.id!)
          .pipe(take(1))
          .subscribe(() => {
            this.confirmationDialogOpened = false;
            this.refreshTeachersPage();
          });
      },
    };
  }
}
