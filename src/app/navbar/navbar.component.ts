import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input('app-name') appName: string = '';
  isList: number = 0;
  isMenu: boolean = false;
  isSearch: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  isActive(route: string): boolean {
    if (route === '/users') {
      return (
        this.router.isActive('/admins', false) ||
        this.router.isActive('/teachers', false) ||
        this.router.isActive('/students', false)
      );
    }
    if (route === '/exams') {
      return (
        this.router.isActive('/applyExams', false) ||
        this.router.isActive('/examResults', false)
      );
    }
    return this.router.isActive(route, false);
  }

  get user() {
    return this.authService.currentUser;
  }
}
