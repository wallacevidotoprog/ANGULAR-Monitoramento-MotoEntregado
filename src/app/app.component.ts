import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
//import { AppRoutingModule } from './app.routing.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    //AppRoutingModule,
    CommonModule,
    RouterOutlet,
    LoginComponent,
    HomepageComponent,
    PageNotFoundComponentComponent,
  ],
})
export class AppComponent {
  title = 'ANGULAR-Monitoramento-MotoEntregado';
}
