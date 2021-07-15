import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { ExamPeriodsComponent } from './exam-periods/exam-periods.component';
import { ExamsApplyComponent } from './exams-apply/exams-apply.component';
import { ExamsResultsComponent } from './exams-results/exams-results.component';
import { FinancialCardComponent } from './financial-card/financial-card.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminAuthGuard } from './services/auth-guards/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guards/auth-guard.service';
import { StudentAuthGuardService } from './services/auth-guards/student-auth-guard.service';
import { AdminsComponent } from './users/admins/admins.component';
import { TeachersComponent } from './users/teachers/teachers.component';
import { StudentsComponent } from './users/students/students.component';
import { TeacherComponent } from './users/teachers/teacher/teacher.component';
import { ExamPeriodComponent } from './exam-periods/exam-period/exam-period.component';
import { CourseComponent } from './courses/course/course.component';
import { StudentComponent } from './users/students/student/student.component';
import { CoursesComponent } from './courses/courses.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { SingleExamObligationComponent } from './courses/exam-obligation/single-exam-obligation/single-exam-obligation.component';
import { AdminTeacherAuthGuardService } from './services/auth-guards/admin-teacher-auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'examObligations/:id',
    component: SingleExamObligationComponent,
    canActivate: [AuthGuard, AdminTeacherAuthGuardService],
  },
  {
    path: 'examPeriods',
    component: ExamPeriodsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'examPeriods/:id',
    component: ExamPeriodComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  { 
    path: 'teachers/:id',
    component: TeacherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'students/:id',
    component: StudentComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'enrollments',
    component: EnrollmentsComponent,
    canActivate: [AuthGuard, StudentAuthGuardService],
  },
  {
    path: 'applyExams',
    component: ExamsApplyComponent,
    canActivate: [AuthGuard, StudentAuthGuardService],
  },
  {
    path: 'examResults',
    component: ExamsResultsComponent,
    canActivate: [AuthGuard, StudentAuthGuardService],
  },
  {
    path: 'financialCard',
    component: FinancialCardComponent,
    canActivate: [AuthGuard, StudentAuthGuardService],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [AuthGuard, StudentAuthGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
