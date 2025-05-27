import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobListComponent } from './job-list/job-list.component';

export const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'add', component: JobFormComponent },
  { path: 'edit/:id', component: JobFormComponent },
  { path: 'dashboard', component: DashboardComponent },
];
