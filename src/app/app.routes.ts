import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AuthGuard } from './guards/auth-guard';
import { ServicesComponent } from './components/services/services.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ReportComponent } from './components/report/report.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'login' },
  {
    path: '',
    component: HomepageComponent,
    title: 'Home Page',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Entraga'
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent,
        title: 'Manutenção'
      },
      {
        path: 'report',
        component: ReportComponent,
        title: 'Relatórios'
      },
    ],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];
