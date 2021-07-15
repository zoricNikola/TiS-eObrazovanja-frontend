import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Teacher } from 'src/app/model/teacher/teacher';
import { AuthService } from 'src/app/services/auth.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teachings',
  templateUrl: './teachings.component.html',
  styleUrls: ['./teachings.component.css']
})
export class TeachingsComponent implements OnInit {

  showTeachings: boolean = true;

  teacher$: Observable<Teacher> = of();

  constructor(private authService: AuthService,
    private teacherService: TeachersService) { }

  ngOnInit(): void {
    this.teacher$ = this.teacherService.getTeacher(this.authService.currentUser?.teacherId!);
  }

  goBack(){
    window.history.back();
  }

}
