import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
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
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'courses',  component: CoursesComponent, canActivate: [AuthGuard]},
  { path: 'examPeriods',  component: ExamPeriodsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'admins',  component: UsersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'teachers',  component: UsersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'students',  component: UsersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'applyExams',  component: ExamsApplyComponent, canActivate: [AuthGuard, StudentAuthGuardService]},
  { path: 'examResults',  component: ExamsResultsComponent, canActivate: [AuthGuard, StudentAuthGuardService]},
  { path: 'financialCard',  component: FinancialCardComponent, canActivate: [AuthGuard, StudentAuthGuardService]},
  { path: 'documents',  component: DocumentsComponent, canActivate: [AuthGuard, StudentAuthGuardService]},
  { path: 'login',  component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
