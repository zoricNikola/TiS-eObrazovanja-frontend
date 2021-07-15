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
import { AssignTeacherToCourseFormDialogComponent } from './courses/course/assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { TeacherRoleFormDialogComponent } from './users/teachers/teacher-role-form-dialog/teacher-role-form-dialog.component';
import { TeacherComponent } from './users/teachers/teacher/teacher.component';
import { AssignCourseToTeacherFormDialogComponent } from './users/teachers/assign-course-to-teacher-form-dialog/assign-course-to-teacher-form-dialog.component';
import { ExamsComponent } from './courses/exams/exams.component';
import { ExamPeriodComponent } from './exam-periods/exam-period/exam-period.component';
import { CreateExamFormDialogComponent } from './courses/exam-form-dialog/exam-form-dialog.component';
import { StudentComponent } from './users/students/student/student.component';
import { ExamFormDialogComponent } from './courses/exams/exam-form-dialog/exam-form-dialog.component';
import { TransactionsComponent } from './financial-card/transactions/transactions.component';
import { TransactionFormDialogComponent } from './financial-card/transactions/transaction-form-dialog/transaction-form-dialog.component';
import { StudentEnrollmentsComponent } from './users/students/student-enrollments/student-enrollments.component';
import { StudentEnrollmentFormDialogComponent } from './users/students/student-enrollments/student-enrollment-form-dialog/student-enrollment-form-dialog.component';
import { SelectCourseDialogComponent } from './courses/select-course-dialog/select-course-dialog.component';
import { ExamObligationComponent } from './courses/exam-obligation/exam-obligation.component';
import { ExamObligationFormDialogComponent } from './courses/exam-obligation/exam-obligation-form-dialog/exam-obligation-form-dialog.component';
import { ExamObligationTypeComponent } from './courses/exam-obligation-type/exam-obligation-type.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { CourseEnrollmentsComponent } from './courses/course-enrollments/course-enrollments.component';
import { CourseEnrollmentFormDialogComponent } from './courses/course-enrollments/course-enrollment-form-dialog/course-enrollment-form-dialog.component';
import { SelectStudentDialogComponent } from './users/students/select-student-dialog/select-student-dialog.component';
import { SingleExamObligationComponent } from './courses/exam-obligation/single-exam-obligation/single-exam-obligation.component';
import { ExamObligationTakingFormDialogComponent } from './courses/exam-obligation/single-exam-obligation/exam-obligation-taking-form-dialog/exam-obligation-taking-form-dialog.component';
import { SelectCourseEnrollmentDialogComponent } from './courses/course-enrollments/select-course-enrollment-dialog/select-course-enrollment-dialog.component';
import { ObligationTakingsComponent } from './courses/exam-obligation/single-exam-obligation/obligation-takings/obligation-takings.component';

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
    TeacherRoleFormDialogComponent,
    TeacherComponent,
    AssignCourseToTeacherFormDialogComponent,
    ExamsComponent,
    ExamPeriodComponent,
    StudentComponent,
    ExamFormDialogComponent,
    CreateExamFormDialogComponent,
    TransactionFormDialogComponent,
    TransactionsComponent,
    StudentEnrollmentsComponent,
    StudentEnrollmentFormDialogComponent,
    SelectCourseDialogComponent,
    ExamObligationComponent,
    ExamObligationFormDialogComponent,
    ExamObligationTypeComponent,
    EnrollmentsComponent,
    CourseEnrollmentsComponent,
    CourseEnrollmentFormDialogComponent,
    SelectStudentDialogComponent,
    SingleExamObligationComponent,
    ExamObligationTakingFormDialogComponent,
    SelectCourseEnrollmentDialogComponent,
    ObligationTakingsComponent,
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
    MatRadioModule,
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
