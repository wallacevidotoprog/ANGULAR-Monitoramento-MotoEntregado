import {  Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import {PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component'
import { HomeAdminComponent } from './components/home-admin/home-admin.component';


export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  { path: 'home', component: HomepageComponent, title: 'Home Page' },
  { path: 'admin', component: HomeAdminComponent, title: 'Home Admin' },
  { path: '**', component: PageNotFoundComponentComponent }
];
