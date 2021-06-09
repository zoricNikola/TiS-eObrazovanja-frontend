import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { ExamPeriodsComponent } from './exam-periods/exam-periods.component';
import { UsersComponent } from './users/users.component';
import { ExamsApplyComponent } from './exams-apply/exams-apply.component';
import { ExamsResultsComponent } from './exams-results/exams-results.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { AdminAuthGuard } from './services/auth-guards/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guards/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { DocumentsComponent } from './documents/documents.component';
import { FinancialCardComponent } from './financial-card/financial-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppErrorHandler } from './common/app-error-handler';
import { AccordionComponent } from './common/accordion/accordion.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { AdminsComponent } from './users/admins/admins.component';
import { AuthInterceptor } from './auth-interceptor.service';
import { DialogComponent } from './common/dialog/dialog.component';
import { AdminFormDialogComponent } from './users/admins/admin-form-dialog/admin-form-dialog.component';
import { ExamPeriodFormDialogComponent } from './exam-periods/exam-period-form-dialog/exam-period-form-dialog.component';
import { CourseFormDialogComponent } from './courses/course-form-dialog/course-form-dialog.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { TeachersComponent } from './users/teachers/teachers.component';
import { StudentsComponent } from './users/students/students.component';
import { StudentFormDialogComponent } from './users/students/student-form-dialog/student-form-dialog.component';
import { TeacherFormDialogComponent } from './users/teachers/teacher-form-dialog/teacher-form-dialog.component';
import { CourseComponent } from './courses/course/course.component';
import { AssignTeacherToCourseFormDialogComponent } from './courses/assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    CoursesComponent,
    ExamPeriodsComponent,
    UsersComponent,
    ExamsApplyComponent,
    ExamsResultsComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    DocumentsComponent,
    FinancialCardComponent,
    AccordionComponent,
    PaginationComponent,
    AdminsComponent,
    DialogComponent,
    AdminFormDialogComponent,
    ExamPeriodFormDialogComponent,
    CourseFormDialogComponent,
    ConfirmationDialogComponent,
    TeachersComponent,
    StudentsComponent,
    StudentFormDialogComponent,
    TeacherFormDialogComponent,
    CourseComponent,
    AssignTeacherToCourseFormDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
