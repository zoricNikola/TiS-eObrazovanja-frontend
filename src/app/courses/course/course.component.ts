import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {Course} from '../../model/course/course';
import {Observable, of} from 'rxjs';
import {TeachingsPage} from '../../model/teacher/teachings-page';
import {FORM_STATE} from '../../model/common/form-state';
import {Teachings} from '../../model/teacher/teachings';
import {TeacherTeachingCourseFormDialogOptions} from '../assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';


@Component({
  selector: '[course]',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input('selectable') selectable = false;

  selectedCourseId = this.route.snapshot.params.id;
  course$: Observable<Course> = of();

  teachingsPage$: Observable<TeachingsPage> = of ();

  showTeachings = false;

  teacherTeachingCourseFormDialogOpened: boolean = false;
  teacherTeachingCourseFormDialogOptions: TeacherTeachingCourseFormDialogOptions = {
    state: FORM_STATE.ADD,
    teacherTeachingCourseForEdit: undefined,
    cancel: () => {},
    save: (teaching: Teachings) => {},
  };

  constructor(private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.course$ = this.courseService.getCourse(this.selectedCourseId);
    this.courseService.getCourseId(this.selectedCourseId);
    this.teachingsPage$ = this.courseService.getTeachersTeachingCourse();
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
      save: (teaching: Teachings) => {
        console.log('Saved');
        this.teacherTeachingCourseFormDialogOpened = false;
      }
      };
    }

  onEditTeacherTeachingCourseClick(teaching: Teachings): void {
    this.teacherTeachingCourseFormDialogOpened = true;

    this.teacherTeachingCourseFormDialogOptions = {
      state: FORM_STATE.EDIT,
      teacherTeachingCourseForEdit: teaching,
      cancel: () => {
        this.teacherTeachingCourseFormDialogOpened = false;
      },
      save: (teaching: Teachings) => {
        console.log('Edited');
        this.teacherTeachingCourseFormDialogOpened = false;
      }
    };
  }



}
