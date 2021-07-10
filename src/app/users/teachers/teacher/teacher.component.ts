import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeacherTeachingCourseFormDialogOptions } from 'src/app/courses/assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
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

  teachersTeachingPage$: Observable<TeachingPage> = of();

  teacherTeachingCourseFormDialogOpened: boolean = false;
  teacherTeachingCourseFormDialogOptions: TeacherTeachingCourseFormDialogOptions = {
    state: FORM_STATE.ADD,
    teacherTeachingCourseForEdit: undefined,
    cancel: () => {},
    save: (teaching: Teaching) => {},
  };


  constructor(private route: ActivatedRoute,
              private router: Router,
              private teacherService: TeachersService,
              private teachingService: TeachingService) { }

  ngOnInit(): void {
    this.teacher$ = this.teacherService.getTeacher(this.selectedTeacherId);
    this.teachersTeachingPage$ = this.teachingService.getTeachersTeachings(this.selectedTeacherId);
  }

  goBack(): void {
    window.history.back();
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
        //teaching.teacher = this.teacher;
        
        }
      }
  }

}
