import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Observable, of } from 'rxjs';
import { AdminPage } from './../../model/user/admin-page';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminsService } from './../../services/admins.service';
import { switchMap } from 'rxjs/operators';
import { PageParams } from './../../model/http/page-params';

@Component({
  selector: '[admins]',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  @Input('selectable') selectable: boolean = false;
  @Input('pageParams$') pageParams$: Observable<PageParams> = of();
  @Output('pageChange') pageChange: EventEmitter<number> = new EventEmitter();
  @Output('pageSizeChange') pageSizeChange: EventEmitter<number> =
    new EventEmitter();
  @Output('itemTake') adminTake: EventEmitter<User> = new EventEmitter();

  selectedAdmin: User | undefined = undefined;

  adminsPage$: Observable<AdminPage> = of();

  showSearchBox: boolean = false;

  constructor(private adminsService: AdminsService) {}

  ngOnInit(): void {
    this.adminsPage$ = this.pageParams$.pipe(
      switchMap((params: PageParams) => {
        return this.adminsService.getAdmins(params);
      })
    );
  }

  onPageChange(selectedPage: number): void {
    this.pageChange.emit(selectedPage);
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.pageSizeChange.emit(selectedPageSize);
  }

  onAdminSelect(admin: User): void {
    this.selectedAdmin = this.selectedAdmin === admin ? undefined : admin;
  }

  onAdminTake(): void {
    this.adminTake.emit(this.selectedAdmin);
  }
}
