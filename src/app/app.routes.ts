import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AuthGuard } from './guards/auth-guard';
import { ServicesComponent } from './components/services/services.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  {
    path: 'home',
    component: HomepageComponent,
    title: 'Home Page',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Services',
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];
