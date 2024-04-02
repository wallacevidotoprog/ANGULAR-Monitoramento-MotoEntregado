import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavBarComponent } from '../nav-bar-component/nav-bar.component';
import { ServicesComponent } from '../services/services.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavBarComponent,ServicesComponent,RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
