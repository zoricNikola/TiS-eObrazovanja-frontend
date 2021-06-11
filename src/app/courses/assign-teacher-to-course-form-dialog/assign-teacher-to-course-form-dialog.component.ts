import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Teacher} from '../../model/teacher/teacher';
import {TeacherRole} from '../../model/teacher/teacher-role';
import {FORM_STATE} from '../../model/common/form-state';
import {Teaching} from '../../model/teacher/teaching';
import {TeachersService} from '../../services/teachers.service';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';
import {PageParams} from '../../model/http/page-params';
import {TeachingService} from '../../services/teaching.service';
import {TeacherPage} from '../../model/teacher/teacher-page';
import {SortParamsUtils} from '../../services/utils/sort-params-utils.service';
import {TeacherRoleService} from '../../services/teacher-role.service';
import {TeacherRolePage} from '../../model/teacher/teacher-role-page';
import {TeacherRoleFormDialogOptions} from '../../users/teachers/teacher-role-form-dialog/teacher-role-form-dialog.component';

export interface TeacherTeachingCourseFormDialogOptions {
  state: FORM_STATE;
  teacherTeachingCourseForEdit: Teaching | undefined;
  cancel: () => void;
  save: (teaching: Teaching) => void;
}

@Component({
  selector: 'assign-teacher-to-course-form-dialog',
  templateUrl: './assign-teacher-to-course-form-dialog.component.html',
  styleUrls: ['./assign-teacher-to-course-form-dialog.component.css']
})
export class AssignTeacherToCourseFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened = false;
  @Input('options') options!: TeacherTeachingCourseFormDialogOptions;
  @Input('selectable') selectable = true;

  selectedTeacher: Teacher | undefined = undefined;

  @ViewChild('f') form!: NgForm;

  teachersPage$: Observable<TeacherPage> = of();
  teachersPageTable$!: Observable<TeacherPage>;

  originalTeachingRole: TeacherRole | undefined;
  teacherNameAndSurname: string | undefined;

  showSearchBox = false;

  teacherRoleFormDialogOpened: boolean = false;
  teacherRoleFormDialogOptions: TeacherRoleFormDialogOptions = {
    state: FORM_STATE.ADD,
    teacherRoleForEdit: undefined,
    cancel: () => {},
    save: (teacherRole: TeacherRole) => {},
  };

  teaching: Teaching = {
    startDate: new Date(''),
    teacher: {
      firstName: '',
      lastName: '',
      address: '',
      dateOfBirth: new Date(''),
      teacherTitle: {
        id: 0,
        name: '',
      },
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
    },
    teacherRole: {
      id: 0,
      name: '',
    },
  };

  teacherRoles$!: Observable<TeacherRolePage>;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.teacherTeachingCourseForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.teaching = { ...this.options.teacherTeachingCourseForEdit };
      this.originalTeachingRole = this.options.teacherTeachingCourseForEdit.teacherRole;
      this.teacherNameAndSurname = this.options.teacherTeachingCourseForEdit.teacher.firstName + ` ` +
        this.options.teacherTeachingCourseForEdit.teacher.lastName;
    }

    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.teaching = {
          startDate: new Date(),
          teacher: {
            firstName: '',
            lastName: '',
            address: '',
            dateOfBirth: new Date(''),
            teacherTitle: {
              id: 0,
              name: '',
            },
            user: {
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
            },
          },
          teacherRole: {
            id: 0,
            name: '',
          },
        };
        this.originalTeachingRole = undefined;
        this.selectedTeacher = undefined;
      }, 3000);
    }
  }

  constructor(private teacherService: TeachersService,
              private teachingsService: TeachingService,
              private route: ActivatedRoute,
              private router: Router,
              public sortParamUtils: SortParamsUtils,
              private teacherRoleService: TeacherRoleService) { }

  ngOnInit(): void {
    this.teachersPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );
        let queryParams = {
          firstName: paramMap.get('firstName'),
          lastName: paramMap.get('lastName'),
          teacherTitleName: paramMap.get('teacherTitle'),
          email: paramMap.get('email'),
          sort: paramMap.getAll('sort')
        };
        return this.teacherService.filterTeachers(pageParams, queryParams);
      })
    );
    this.teachersPageTable$ = this.teachersPage$;
    this.teacherRoles$ = this.teacherRoleService.getTeacherRoles();
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.teaching.startDate = new Date();
      this.options.save(this.teaching);
    }
  }

  onSearchOptionsChange(queryParams: any): void {
    for (const key of Object.keys(queryParams)) {
      if (!queryParams[key]) {
        queryParams[key] = null;
      }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedTeacher = undefined) : {};
    let newSortParams = this.sortParamUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: newSortParams },
      queryParamsHandling: 'merge',
    });
  }

  onTeacherSelect(teacher: Teacher): void{
    this.selectedTeacher = this.selectedTeacher === teacher ? undefined : teacher;
    if (this.selectedTeacher) {
      this.teaching.teacher = this.selectedTeacher;
    }
  }

  onNewTeacherRoleClick(): void {
    this.teacherRoleFormDialogOpened = true;

    this.teacherRoleFormDialogOptions = {
      state: FORM_STATE.ADD,
      teacherRoleForEdit: undefined,
      cancel: () => {
        this.teacherRoleFormDialogOpened = false;
      },
      save: (teacherRole: TeacherRole) => {
        this.teacherRoleService
          .createTeacherRole(teacherRole)
          .pipe(take(1))
          .subscribe(() => {
            this.teacherRoleFormDialogOpened = false;
            this.teacherRoles$ = this.teacherRoleService.getTeacherRoles();
          });
      },
    };
  }


}
