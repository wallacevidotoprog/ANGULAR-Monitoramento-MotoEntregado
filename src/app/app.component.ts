import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    LoginComponent,
    HomepageComponent,
    PageNotFoundComponentComponent,
    AlertComponent,
    MatDialogModule,
  ],
})
export class AppComponent {
  title = 'ANGULAR-Monitoramento-MotoEntregado';
}
