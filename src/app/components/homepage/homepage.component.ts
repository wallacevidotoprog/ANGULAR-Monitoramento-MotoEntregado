import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavBarComponent } from '../nav-bar-component/nav-bar.component';
import { ServicesComponent } from '../services/services.component';
import { StateAlert } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavBarComponent,ServicesComponent,RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  private dialogAlert = inject(AlertService)
  onTeste(){
    this.dialogAlert.OpenAlert('Erro ao Re-logar',StateAlert.info);
  }
}
