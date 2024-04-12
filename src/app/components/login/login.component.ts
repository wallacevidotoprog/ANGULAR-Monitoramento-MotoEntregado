import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService, RespAPI } from '../../service/login.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { pipe, Subject, take, takeUntil } from 'rxjs';
import { AlertComponent, StateAlert } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, HttpClientModule,],
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  private dialogAlert = inject(AlertService);
  private tAlert = inject(NgToastService);

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
          this.tAlert.warning({
            detail: 'Falhar de Autenticação',
            summary: 'Você não esta autenticado. \nFaça o Login',
            duration: 5000,
          });
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

  onTeste() {
    this.tAlert.info({
      detail: 'SUCCESS',
      summary: ' AEE SEU PUTO',
      duration: 5000,
    });
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
            this.tAlert.error({
              detail: 'Falhar ao Logar',
              summary: 'Faça o Login com Usuário e Senha corretos',
              duration: 5000,
            });
            return;
          }
          this.tAlert.success({
            detail: 'Logado com Sucesso',
            summary: 'Seja Bem Vindo',
            duration: 5000,
          });
          this.routerService.navigate(['']);
        },
        (error) => {
          this.canLoadin = true;
          this.tAlert.error({
            detail: 'Falhar ao Logar',
            summary: 'Faça o Login com Usuário e Senha corretos',
            duration: 5000,
          });
        }
      );
  }
}
export class UserLogin {
  user!: string;
  pass!: string;
}
