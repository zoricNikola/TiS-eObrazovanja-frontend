import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeacherPage } from 'src/app/model/teacher/teacher-page';

@Component({
  selector: '[teachers]',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  @Input('selectable') selectable: boolean = false;

  teacherPage$: Observable<TeacherPage> = of();

  showSearchBox: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
