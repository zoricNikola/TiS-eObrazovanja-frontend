import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user/user';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { AdminPage } from './../../model/user/admin-page';
import { AdminsService } from './../../services/admins.service';
import { switchMap, take } from 'rxjs/operators';
import { PageParams } from './../../model/http/page-params';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { ActivatedRoute, Router } from '@angular/router';
import { SortParamsUtils } from './../../services/utils/sort-params-utils.service';
import { ConfirmationDialogOptions } from './../../common/confirmation-dialog/confirmation-dialog.component';
import { AdminFormDialogOptions } from './admin-form-dialog/admin-form-dialog.component';

@Component({
  selector: '[admins]',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  @Input('selectable') selectable: boolean = false;
  @Output('itemTake') adminTake: EventEmitter<User> = new EventEmitter();

  selectedAdmin: User | undefined = undefined;

  adminsQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: [],
    name: null
  });

  adminsPage$: Observable<AdminPage> = of();

  showSearchBox: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminsService: AdminsService,
    public sortParamsUtils: SortParamsUtils
  ) {}

  ngOnInit(): void {
    if (!this.selectable) {
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

          return this.adminsService.filterAdmins(pageParams, queryParams);
        })
      );
    } else {
      this.adminsPage$ = this.adminsQueryMap.pipe(switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.page,
          paramMap.size
        );

        const queryParams = {
          sort: paramMap.sort,
          name: paramMap.name
        };

        return this.adminsService.filterAdmins(pageParams, queryParams);
      }));
    }
  }

  onPageChange(selectedPage: number): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: selectedPage === 1 ? null : selectedPage },
        queryParamsHandling: 'merge',
      });
    } else {
      this.adminsQueryMap.next({
        ...this.adminsQueryMap.value,
        page: selectedPage
      });
    }
  }

  onPageSizeChange(selectedPageSize: number): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { size: selectedPageSize },
        queryParamsHandling: 'merge',
      });
    } else {
      this.adminsQueryMap.next({
        ...this.adminsQueryMap.value,
        size: selectedPageSize
      });
    }
  }

  onSearchOptionsChange(queryParams: any): void {
    for (const key of Object.keys(queryParams)) {
      if (!queryParams[key]) {
        queryParams[key] = null;
      }
    }

    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    } else {
      this.adminsQueryMap.next({
        ...this.adminsQueryMap.value,
        ...queryParams
      });
    }
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedAdmin = undefined) : {};
    let newSortParams = this.sortParamsUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );

    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort: newSortParams },
        queryParamsHandling: 'merge',
      });
    } else {
      this.adminsQueryMap.next({
        ...this.adminsQueryMap.value,
        sort: newSortParams
      });
    }
  }

  onAdminSelect(admin: User): void {
    this.selectedAdmin = this.selectedAdmin === admin ? undefined : admin;
  }

  onAdminTake(): void {
    let admin: User = {...this.selectedAdmin as User};
    this.selectedAdmin = undefined;
    this.adminTake.emit(admin);
  }

  refreshAdminsPage(): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.adminsQueryMap.next({
        ...this.adminsQueryMap.value,
        r: 'r'
      });
    }
  }

  adminFormDialogOpened: boolean = false;
  adminFormDialogOptions: AdminFormDialogOptions = {
    state: FORM_STATE.ADD,
    adminForEdit: undefined,
    cancel: () => {},
    save: (admin: User) => {},
  };

  onNewAdminClick(): void {
    this.adminFormDialogOpened = true;

    this.adminFormDialogOptions = {
      state: FORM_STATE.ADD,
      adminForEdit: undefined,
      cancel: () => {
        this.adminFormDialogOpened = false;
      },
      save: (admin: User) => {
        this.adminsService
          .createAdmin(admin)
          .pipe(take(1))
          .subscribe((id) => {
            console.log('Created ', id);
            this.adminFormDialogOpened = false;
            this.refreshAdminsPage();
          });
      },
    };
  }

  onEditAdminClick(admin: User): void {
    this.adminFormDialogOpened = true;

    this.adminFormDialogOptions = {
      state: FORM_STATE.EDIT,
      adminForEdit: admin,
      cancel: () => {
        this.adminFormDialogOpened = false;
      },
      save: (admin: User) => {
        this.adminsService
          .updateAdmin(admin.id!, admin)
          .pipe(take(1))
          .subscribe(() => {
            console.log('Updated ', admin.id);
            this.adminFormDialogOpened = false;
            this.refreshAdminsPage();
          });
      },
    };
  }

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  onAdminDelete(admin: User): void {
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Delete ${admin.username}`,
      message: `Are you sure?`,
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.adminsService
          .deleteAdmin(admin.id!)
          .pipe(take(1))
          .subscribe(() => {
            this.confirmationDialogOpened = false;
            this.refreshAdminsPage();
          });
      },
    };
  }
}
