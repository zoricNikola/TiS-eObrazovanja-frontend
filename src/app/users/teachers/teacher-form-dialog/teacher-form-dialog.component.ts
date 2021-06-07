import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { PageParams } from 'src/app/model/http/page-params';
import { Teacher } from 'src/app/model/teacher/teacher';
import { TeacherTitle } from 'src/app/model/teacher/teacher-title';
import { TeacherTitlePage } from 'src/app/model/teacher/teacher-title-page';
import { TeacherTitleService } from 'src/app/services/teacher-title.service';

export interface TeacherFormDialogOptions{
  state: FORM_STATE;
  teacherForEdit: Teacher | undefined;
  cancel: () => void;
  save: (teacher: Teacher) => void;
}

@Component({
  selector: 'app-teacher-form-dialog',
  templateUrl: './teacher-form-dialog.component.html',
  styleUrls: ['./teacher-form-dialog.component.css']
})
export class TeacherFormDialogComponent implements OnInit, OnChanges {

  @Input('opened') opened: boolean = false;
  @Input('options') options!: TeacherFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  originalTeacherUsername: string | undefined;

  teacherTitlePage$: Observable<TeacherTitlePage> = of();

  teacher: Teacher = {
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: new Date(''),
    teacherTitle: {name: ''},
    user: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    }
  };

  ngOnChanges(changes: SimpleChanges): void{
    if (changes.options &&
      this.options.teacherForEdit &&
      this.options.state === FORM_STATE.EDIT){
      this.teacher = {
        ...this.options.teacherForEdit,
        user: { ...this.options.teacherForEdit.user },
      };
      this.originalTeacherUsername = this.options.teacherForEdit.user.username;
    }

    if (changes.opened && changes.opened.firstChange)
      setTimeout(() => {
        this.form.resetForm();
      }, 10);

    if (changes.opened &&
        !changes.opened.firstChange &&
        !changes.opened.currentValue){
        setTimeout(() => {
          this.teacher = {
            firstName: '',
            lastName: '',
            address: '',
            dateOfBirth: new Date(''),
            teacherTitle: {name: ''},
            user: {
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
            },
          };
          this.form.resetForm();
          this.originalTeacherUsername = undefined;
        }, 300);
      }  
  }

  constructor(private teacherTitleService: TeacherTitleService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onLoadTeacherTitles();
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onLoadTeacherTitles(): void {
    this.teacherTitlePage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );
        let queryParams = {};

        return this.teacherTitleService.getTeacherTitles(pageParams, queryParams);
      })
    )
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.teacher);
    }
  }

  validateUsername(username: NgModel): void{}

}
