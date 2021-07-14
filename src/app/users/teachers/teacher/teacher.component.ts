import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmationDialogOptions } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { TeacherTeachingCourseFormDialogOptions } from 'src/app/courses/course/assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { Teacher } from 'src/app/model/teacher/teacher';
import { Teaching } from 'src/app/model/teacher/teaching';
import { TeachingPage } from 'src/app/model/teacher/teaching-page';
import { TeachersService } from 'src/app/services/teachers.service';
import { TeachingService } from 'src/app/services/teaching.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  showCourses: boolean = false;

  selectedTeacherId = this.route.snapshot.params.id;

  teacher$: Observable<Teacher> = of();
  teacher!: Teacher;

  teachersTeachingPage$: Observable<TeachingPage> = of();

  teacherTeachingCourseFormDialogOpened: boolean = false;
  teacherTeachingCourseFormDialogOptions: TeacherTeachingCourseFormDialogOptions = {
    state: FORM_STATE.ADD,
    teacherTeachingCourseForEdit: undefined,
    cancel: () => {},
    save: (teaching: Teaching) => {},
  };

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teacherService: TeachersService,
              private teachingService: TeachingService) { }

  ngOnInit(): void {
    this.teacher$ = this.teacherService.getTeacher(this.selectedTeacherId);
    this.teachersTeachingPage$ = this.teachingService.getTeachersTeachings(this.selectedTeacherId);
    this.teacher$.subscribe(result => this.teacher = result);
  }

  goBack(): void {
    window.history.back();
  }

  refreshPage(): void {
    this.router.navigate([])
      .then(() => {
        window.location.reload();
      });
  }

  onNewTeacherTeachingCourseClick(): void {
    this.teacherTeachingCourseFormDialogOpened = true;

    this.teacherTeachingCourseFormDialogOptions = {
      state: FORM_STATE.ADD,
      teacherTeachingCourseForEdit: undefined,
      cancel: () => {
        this.teacherTeachingCourseFormDialogOpened = false;
      },
      save: (teaching: Teaching) => {
        teaching.teacher = this.teacher;
        this.teachingService
        .saveTeaching(teaching)
        .pipe(take(1))
        .subscribe(() => {
          this.teacherTeachingCourseFormDialogOpened = false;
          this.refreshPage();
          this.showCourses = true;
        });
      }
    }
  }

  onEditTeacherTeachingCourseClick(teaching: Teaching): void {
    this.teacherTeachingCourseFormDialogOpened = true;

    this.teacherTeachingCourseFormDialogOptions = {
      state: FORM_STATE.EDIT,
      teacherTeachingCourseForEdit: teaching,
      cancel: () => {
        this.teacherTeachingCourseFormDialogOpened = false;
      },
      save: (teaching: Teaching) => {
        teaching.teacher = this.teacher;
        this.teachingService.updateTeaching(teaching.id!, teaching)
          .pipe(take(1))
          .subscribe(() => {
            this.teacherTeachingCourseFormDialogOpened = false;
            this.refreshPage();
            this.showCourses = true;
          });
      }
    };
  }

  onDeleteTeacherTeachingCourseClick(teaching: Teaching): void {
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Unassign ${this.teacher.firstName} ${this.teacher.lastName} from ${teaching.course?.name} course`,
      message: `Are you sure?`,
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.teachingService
          .deleteTeaching(teaching.id!)
          .pipe(take(1))
          .subscribe(() => {
            this.confirmationDialogOpened = false;
            this.refreshPage();
            this.showCourses = true;
          });
      }
    }
  }
}
