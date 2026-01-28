import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'enrollment-form', component: EnrollmentFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
