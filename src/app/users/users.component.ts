import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from '../services/admins.service';
import { StudentsService } from '../services/students.service';
import { TeachersService } from '../services/teachers.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user/user';
import { AdminPage } from './../model/user/admin-page';
import { map, switchMap } from 'rxjs/operators';
import { PageParams } from './../model/http/page-params';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userType: string = '';

  pageParams$: Observable<PageParams> = of(new PageParams(1, 20));

  teachers: any[] = [];
  students: any[] = [];

  showSearchBox: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherService: TeachersService,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.pageParams$ = this.route.queryParamMap.pipe(
      map((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );
        return pageParams;
      })
    );

    const url: string = this.router.url;
    if (url.includes('admins')) {
      this.userType = 'admins';
    } else if (url.includes('teachers')) {
      this.userType = 'teachers';
      this.teacherService
        .getTeachers()
        .subscribe((teachers) => (this.teachers = teachers));
    } else if (url.includes('students')) {
      this.userType = 'students';
      this.studentService
        .getStudents()
        .subscribe((students) => (this.students = students));
    }
    console.log(this.userType);
  }

  onPageChange(selectedPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: selectedPage },
      queryParamsHandling: 'merge',
    });
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { size: selectedPageSize },
      queryParamsHandling: 'merge',
    });
  }

  log(x: any) {
    console.log(x);
  }
}
