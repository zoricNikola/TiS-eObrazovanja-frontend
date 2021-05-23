import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Observable, of } from 'rxjs';
import { AdminPage } from './../../model/user/admin-page';
import { AdminsService } from './../../services/admins.service';
import { switchMap, map } from 'rxjs/operators';
import { PageParams } from './../../model/http/page-params';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: '[admins]',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  @Input('selectable') selectable: boolean = false;
  @Output('itemTake') adminTake: EventEmitter<User> = new EventEmitter();

  selectedAdmin: User | undefined = undefined;

  adminsPage$: Observable<AdminPage> = of();

  showSearchBox: boolean = false;

  adminFormDialogOpened: boolean = false;
  adminFormDialogState: FORM_STATE = FORM_STATE.ADD;

  adminForEdit: User | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminsService: AdminsService
  ) {}

  ngOnInit(): void {
    this.adminsPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );

        let queryParams = {
          firstName: paramMap.get('firstName'),
          lastName: paramMap.get('lastName'),
          username: paramMap.get('username'),
          email: paramMap.get('email'),
          phoneNumber: paramMap.get('phoneNumber'),
          sort: paramMap.getAll('sort'),
        };

        return this.adminsService.getAdmins(pageParams, queryParams);
      })
    );
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onPageChange(selectedPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: selectedPage === 1 ? null : selectedPage },
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

  onSearchOptionsChange(queryParams: any): void {
    for (let key of Object.keys(queryParams)) {
      if (!queryParams[key]) queryParams[key] = null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    let newSortParams = [...sortParams];
    if (newSortParams.includes(triggeredProperty)) {
      newSortParams.splice(newSortParams.indexOf(triggeredProperty), 1);
      newSortParams.push(`${triggeredProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredProperty},asc`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},asc`),
        1
      );
      newSortParams.push(`${triggeredProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredProperty},ASC`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},ASC`),
        1
      );
      newSortParams.push(`${triggeredProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredProperty},desc`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},desc`),
        1
      );
    } else if (newSortParams.includes(`${triggeredProperty},DESC`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},DESC`),
        1
      );
    } else {
      newSortParams.push(`${triggeredProperty},ASC`);
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: newSortParams },
      queryParamsHandling: 'merge',
    });
  }

  isSortASC(sortParams: string[], column: string): boolean {
    return (
      sortParams.includes(column) ||
      sortParams.includes(`${column},asc`) ||
      sortParams.includes(`${column},ASC`)
    );
  }

  isSortDESC(sortParams: string[], column: string): boolean {
    return (
      sortParams.includes(`${column},desc`) ||
      sortParams.includes(`${column},DESC`)
    );
  }

  onAdminSelect(admin: User): void {
    this.selectedAdmin = this.selectedAdmin === admin ? undefined : admin;
  }

  onAdminTake(): void {
    this.adminTake.emit(this.selectedAdmin);
  }

  openAdminFormDialog(state: FORM_STATE): void {
    this.adminFormDialogState = state;
    this.adminFormDialogOpened = true;
  }

  onAdminFormDialogCancel(): void {
    this.adminFormDialogOpened = false;
    this.adminForEdit = undefined;
  }

  onAdminSave(admin: User): void {
    console.log(admin);
  }
}
