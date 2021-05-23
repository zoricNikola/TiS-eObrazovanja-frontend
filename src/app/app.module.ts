import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { AppErrorHandler } from './common/app-error-handler';
import { AccordionComponent } from './common/accordion/accordion.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { AdminsComponent } from './users/admins/admins.component';
import { AuthInterceptor } from './auth-interceptor.service';
import { DialogComponent } from './common/dialog/dialog.component';
import { AdminFormDialogComponent } from './users/admins/admin-form-dialog/admin-form-dialog.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
