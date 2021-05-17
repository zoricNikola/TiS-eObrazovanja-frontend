import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from '../services/admins.service';
import { StudentsService } from '../services/students.service';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userType: string = '';

  users: any[] = [
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
    {
      id: 1,
      username: "brvj",
      firstName: "Boris",
      lastName: "Jankovic",
      address: "Pezos",
      phoneNumber: "021-123-456",
      email: 'brvj@gmail.com',
      authorities: ["admin"],
      fullName: () => `Boris Jankovic`,
    },
  ];

  admins: any[] = [];
  teachers: any[] = [];
  students: any[] = [];

  showSearchBox: boolean = false;

  constructor(private router: Router, private adminService: AdminsService,
            private teacherService: TeachersService, private studentService: StudentsService) { }

  ngOnInit(): void {
    const url: string = this.router.url;
    if (url.includes('admins')) {
      this.userType = 'admins';
      this.adminService.getAdmins().subscribe((admins) => this.admins = admins)
    }
    else if (url.includes('teachers')) {
      this.userType = 'teachers';
      this.teacherService.getTeachers().subscribe((teachers) => this.teachers = teachers)
    }
    else if (url.includes('students')) {
      this.userType = 'students';
      this.studentService.getStudents().subscribe((students) => this.students = students)
    }
    console.log(this.userType);
  }

}
