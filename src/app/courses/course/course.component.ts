import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {Course} from '../../model/course/course';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TeachingPage} from '../../model/teacher/teaching-page';
import {FORM_STATE} from '../../model/common/form-state';
import {Teaching} from '../../model/teacher/teaching';
import {TeacherTeachingCourseFormDialogOptions} from './assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
import {TeachingService} from '../../services/teaching.service';
import {ConfirmationDialogOptions} from '../../common/confirmation-dialog/confirmation-dialog.component';
import {take} from 'rxjs/operators';
import { EnrollmentPage } from 'src/app/model/student/enrollment-page';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { Enrollment } from 'src/app/model/student/enrollment';


@Component({
  selector: '[course]',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input('selectable') selectable = false;

  selectedCourseId = this.route.snapshot.params.id;
  course$: Observable<Course> = of();
  course!: Course;

  teachersTeachingCoursePage$: Observable<TeachingPage> = of();
  courseEnrollmentsPage$: Observable<EnrollmentPage> = of();

  showTeachings = false;
  showExams = false;
  showStudents = false;
  showExamObligations = false;

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
              private courseService: CourseService,
              private teachingService: TeachingService,
              private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.course$ = this.courseService.getCourse(this.selectedCourseId);
    this.courseService.getCourse(this.selectedCourseId).subscribe((course: Course) => this.course = course);
    this.teachersTeachingCoursePage$ = this.teachingService.getTeachersTeachingCourse(this.selectedCourseId);
    this.courseEnrollmentsPage$ = this.enrollmentService.getCourseEnrollments(this.selectedCourseId);
  }

  goBack(): void {
    window.history.back();
  }

  refreshCoursePage(): void {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
        },
        queryParamsHandling: 'merge',
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
        teaching.course = this.course;
        this.teachingService
          .saveTeaching(teaching)
          .pipe(take(1))
          .subscribe(() => {
            this.teacherTeachingCourseFormDialogOpened = false;
            this.refreshCoursePage();
          });
        }
      };
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
        teaching.course = this.course;
        this.teachingService.updateTeaching(teaching.id!, teaching)
          .pipe(take(1))
          .subscribe(() => {
            this.teacherTeachingCourseFormDialogOpened = false;
            this.refreshCoursePage();
          });
      }
    };
  }

  onDeleteTeacherTeacnihgCourseClick(teaching: Teaching): void {
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Unassign ${teaching.teacher?.firstName} ${teaching.teacher?.lastName} from ${this.course.name} course`,
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
            this.refreshCoursePage();
          });
      }
    };
  }

  onNewEnrollmentClick(): void {}

  onEditEnrollmentClick(enrollment: Enrollment): void {}

  onDeleteEnrollmentClick(enrollment: Enrollment): void {}

}
