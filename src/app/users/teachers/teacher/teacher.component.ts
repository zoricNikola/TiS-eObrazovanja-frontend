import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Teacher } from 'src/app/model/teacher/teacher';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  showCourses: boolean = false;

  selectedTeacherId = this.route.snapshot.params.id;

  teacher$: Observable<Teacher> = of();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teacherService: TeachersService) { }

  ngOnInit(): void {
    this.teacher$ = this.teacherService.getTeacher(this.selectedTeacherId);
  }

  goBack(): void {
    window.history.back();
  }

}
