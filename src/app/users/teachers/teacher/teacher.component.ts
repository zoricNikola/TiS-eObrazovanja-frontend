import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Teacher } from 'src/app/model/teacher/teacher';
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
}
