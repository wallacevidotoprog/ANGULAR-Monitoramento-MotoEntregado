import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  vf = this.loginService.VerifyToken();
  canLoadin: boolean = true;
  dataUser = new UserLogin();
  async Login(){
    this.canLoadin=false;
    this.loginService.Login(this.dataUser).then((dt)=>{
      if(dt.err){
        this.canLoadin=dt.err;
        alert(dt.menssage)
      }
    })

  }

}
export class UserLogin {
  user!: string;
  pass!: string;
}
