import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PageParams } from 'src/app/model/http/page-params';
import { Teacher } from 'src/app/model/teacher/teacher';
import { TeacherPage } from 'src/app/model/teacher/teacher-page';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: '[teachers]',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  @Input('selectable') selectable: boolean = false;
  @Output('itemTake') teacherTake: EventEmitter<Teacher> = new EventEmitter();

  teacherPage$: Observable<TeacherPage> = of();

  selectedTeacher: Teacher | undefined = undefined;
  teacherForEdit: Teacher | undefined = undefined;

  showSearchBox: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private teachersService: TeachersService) { }

  ngOnInit(): void {
    this.onLoadTeachers();
  }

  onTeacherSelect(teacher: Teacher): void{
    this.selectedTeacher = this.selectedTeacher === teacher ? undefined : teacher;
  }

  onTeacherTake(): void{
    this.teacherTake.emit(this.selectedTeacher);
  }

  onLoadTeachers(): void {
    this.teacherPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );
        let queryParams = {
          firstName: paramMap.get('firstName'),
          lastName: paramMap.get('lastName'),
          username: paramMap.get('username'),
          address: paramMap.get('address'),
          teacherTitleName: paramMap.get('teacherTitle'),
          dateOfBirthFrom: paramMap.get('dateOfBirthFrom'),
          dateOfBirthTo: paramMap.get('dateOfBirthTo'),
          email: paramMap.get('email'),
          phoneNumber: paramMap.get('phoneNumber')};

        return this.teachersService.filterTeachers(pageParams, queryParams);
      })
    )
  }

  onPageChange(selectedPage: number): void{
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: selectedPage === 1 ? null : selectedPage },
      queryParamsHandling: 'merge',
    });
  }

  onPageSizeChange(selectedPageSize: number): void{
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { size: selectedPageSize },
      queryParamsHandling: 'merge',
    });
  }

  onSearchOptionsChange(queryParams: any): void {
    this.selectable ? (this.selectedTeacher = undefined) : {};
    for (let key of Object.keys(queryParams)) {
      if (!queryParams[key]) queryParams[key] = null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

}
