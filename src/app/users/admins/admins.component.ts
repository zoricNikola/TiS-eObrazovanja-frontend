import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Observable, of, BehaviorSubject, AsyncSubject } from 'rxjs';
import { AdminPage } from './../../model/user/admin-page';
import { AdminsService } from './../../services/admins.service';
import { switchMap, map, take } from 'rxjs/operators';
import { PageParams } from './../../model/http/page-params';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { ActivatedRoute, Router } from '@angular/router';
import { SortParamsUtils } from './../../services/utils/sort-params-utils.service';

@Component({
  selector: '[admins]',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  @Input('selectable') selectable: boolean = true;
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
    private adminsService: AdminsService,
    public sortParamsUtils: SortParamsUtils
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
    let newSortParams = this.sortParamsUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: newSortParams },
      queryParamsHandling: 'merge',
    });
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

  closeAdminFormDialog(): void {
    this.adminFormDialogOpened = false;
    this.adminForEdit = undefined;
  }

  onAdminFormDialogCancel(): void {
    this.closeAdminFormDialog();
  }

  refreshAdminsPage(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
      },
      queryParamsHandling: 'merge',
    });
  }

  onAdminSave(admin: User): void {
    if (!admin.id)
      this.adminsService
        .createAdmin(admin)
        .pipe(take(1))
        .subscribe((id) => {
          console.log(id);
          this.closeAdminFormDialog();
          this.refreshAdminsPage();
        });
    else
      this.adminsService
        .updateAdmin(admin.id, admin)
        .pipe(take(1))
        .subscribe(() => {
          console.log('Updated ', admin.id);
          this.closeAdminFormDialog();
          this.refreshAdminsPage();
        });
  }

  confirmationDialogOpened: boolean = false;
  confirmationDialog$!: AsyncSubject<boolean>;

  dialogOptions = {
    opened: false,
    decline: () => {},
    confirm: () => {},
  };

  onAdminDelete(admin: User): void {
    this.confirmationDialog$ = new AsyncSubject();

    this.dialogOptions = {
      opened: true,
      decline: () => {
        this.dialogOptions.opened = false;
      },
      confirm: () => {
        console.log('Confirmed deleting ', admin.id);
      },
    };

    // this.confirmationDialogOpened = true;

    this.confirmationDialog$.subscribe((result) => {
      if (result && admin.id)
        this.adminsService
          .deleteAdmin(admin.id)
          .pipe(take(1))
          .subscribe(() => {
            setTimeout(() => {
              console.log('Deleted ', admin.id);
              this.confirmationDialogOpened = false;
              this.refreshAdminsPage();
            }, 2000);
          });
      else this.confirmationDialogOpened = false;
    });
  }
}
