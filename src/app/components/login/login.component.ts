import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService, RespAPI } from '../../service/login.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { pipe, Subject, take, takeUntil } from 'rxjs';
import { AlertComponent, StateAlert } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, HttpClientModule],
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  private dialogAlert = inject(AlertService)
  ngOnInit(): void {
    this.canLoadin = false;
    this.loginService
      .eVerifyToken()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (res.err) {
            this.canLoadin = true;
            return;
          }
          this.routerService.navigate(['']);
        },
        (error) => {
          this.canLoadin = true;
          //this.dialogAlert.OpenAlert('Erro ao Re-logar',StateAlert[StateAlert.info]);
        },
        () => {
          console.log('finish');
        }
      );
  }
  private routerService = inject(Router);
  private loginService = inject(LoginService);

  canLoadin: boolean = true;

  dataUser = new UserLogin();

  onTeste(){
    this.dialogAlert.OpenAlert('Erro ao Re-logar',StateAlert.info);
  }
  Login() {
    this.canLoadin = false;
    this.loginService
      .eLogin(this.dataUser)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (res.err) {
            this.canLoadin = true;
            return;
          }
          this.routerService.navigate(['']);
        },
        (error) => {
          this.canLoadin = true;
        }
      );
  }
}
export class UserLogin {
  user!: string;
  pass!: string;
}
