import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {Course} from '../../model/course/course';
import {Observable, of} from 'rxjs';
import {TeachingsPage} from '../../model/teacher/teachings-page';


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

  }

  onEditTeacherTeachingCourseClick(): void {
      console.log('Edit');
  }

  onRemoveTeacherTeachingCourseClick(): void {
      console.log('Remove');
  }

}
