import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from './../model/current-user';

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
    if (route === '/courses') {
      return (
        this.router.isActive('/courses', false) ||
        this.router.isActive('/teachings', false) ||
        this.router.isActive('/enrollments', false)
      );
    }
    return this.router.isActive(route, false);
  }

  get user() {
    return this.authService.currentUser;
  }

  isUserAdmin(): boolean {
    return (this.user as CurrentUser)?.authorities.includes('ADMIN');
  }

  isUserStudent(): boolean {
    return (this.user as CurrentUser)?.authorities.includes('STUDENT');
  }

  isUserTeacher(): boolean {
    return (this.user as CurrentUser)?.authorities.includes('TEACHER');
  }
}
