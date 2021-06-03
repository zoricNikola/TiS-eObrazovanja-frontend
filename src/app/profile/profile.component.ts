import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Student } from '../model/student/student';
import { Teacher } from '../model/teacher/teacher';
import { User } from '../model/user/user';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from './../model/current-user';
import { StudentsService } from './../services/students.service';
import { AdminsService } from './../services/admins.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TeachersService } from './../services/teachers.service';

@Component({
  selector: '[profile]',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private studentsService: StudentsService,
    private adminsService: AdminsService,
    private teachersService: TeachersService,
    private router: Router
  ) {}

  formData: any = {
    user: {},
  };

  editMode: boolean = false;

  currentUser!: CurrentUser;
  currentUserType!: string;

  originalUser!: User | Student | Teacher;

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser as CurrentUser;

    if (this.currentUser.authorities.includes('STUDENT')) {
      this.studentsService
        .getStudent(this.currentUser.studentId!)
        .pipe(take(1))
        .subscribe((student: Student) => {
          this.originalUser = student;
          this.formData = {
            ...student,
            username: student.user.username,
            email: student.user.email,
            phoneNumber: student.user.phoneNumber,
          };
          this.currentUserType = 'STUDENT';
        });
    } else if (this.currentUser.authorities.includes('TEACHER')) {
      this.teachersService
        .getTeacher(this.currentUser.teacherId!)
        .pipe(take(1))
        .subscribe((teacher: Teacher) => {
          this.originalUser = teacher;
          this.formData = {
            ...teacher,
            username: teacher.user.username,
            email: teacher.user.email,
            phoneNumber: teacher.user.phoneNumber,
          };
          this.currentUserType = 'TEACHER';
        });
    } else if (this.currentUser.authorities.includes('ADMIN')) {
      this.adminsService
        .getAdmin(this.currentUser.id)
        .pipe(take(1))
        .subscribe((admin: User) => {
          this.originalUser = admin;
          this.formData = { ...admin };
          this.currentUserType = 'ADMIN';
        });
    }
  }

  onCancel(form: NgForm): void {
    this.editMode = false;
    if (this.currentUserType === 'ADMIN')
      form.resetForm({ ...this.originalUser });
    else
      form.resetForm({
        ...this.originalUser,
        username: (this.originalUser as any).user.username,
        email: (this.originalUser as any).user.email,
        phoneNumber: (this.originalUser as any).user.phoneNumber,
      });
  }

  submit(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.valid) {
      if (this.currentUserType === 'ADMIN') {
        this.adminsService
          .updateAdmin(this.originalUser.id!, this.formData as User)
          .pipe(take(1))
          .subscribe(() => this.profileUpdated(this.formData));
      } else {
        let data = { ...this.formData, user: { ...this.formData.user } };
        data.user.username = data.username;
        delete data['username'];
        data.user.email = data.email;
        delete data['email'];
        data.user.phoneNumber = data.phoneNumber;
        delete data['phoneNumber'];

        if (this.currentUserType === 'STUDENT') {
          this.studentsService
            .updateStudent(this.originalUser.id!, data as Student)
            .pipe(take(1))
            .subscribe(() => this.profileUpdated(data));
        } else if (this.currentUserType === 'TEACHER') {
          this.teachersService
            .updateTeacher(this.originalUser.id!, data as Teacher)
            .pipe(take(1))
            .subscribe(() => this.profileUpdated(data));
        }
      }
    }
  }

  profileUpdated(newUser: any): void {
    console.log('Updated ', this.originalUser.id);

    if (this.currentUserType === 'ADMIN') {
      if ((this.originalUser as User).username !== newUser.username) {
        this.router.navigate(['/logout']);
        return;
      }
    } else if (
      (this.originalUser as any).user.username !== newUser.user.username
    ) {
      this.router.navigate(['/logout']);
      return;
    }

    this.originalUser = { ...newUser };
    this.editMode = false;
    this.authService
      .reloadJwt()
      .pipe(take(1))
      .subscribe(() => {
        this.currentUser = this.authService.currentUser as CurrentUser;
      });
  }
}
