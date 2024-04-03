import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService, RespAPI } from '../../service/login.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { catchError, pipe, Subject, take, takeUntil } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  ngOnInit(): void {
    this.canLoadin = false;
    this.loginService
      .eVerifyToken()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        if (res.err) {
          this.canLoadin = true;
          return;
        }
        this.routerService.navigate(['']);
      },
      (error)=>{
        this.canLoadin = true;
      });
  }
  private routerService = inject(Router);
  private loginService = inject(LoginService);

  canLoadin: boolean = true;

  dataUser = new UserLogin();

  Login() {
    this.canLoadin = false;
    this.loginService
      .eLogin(this.dataUser)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        if (res.err) {
          this.canLoadin = true;
          return;
        }
        this.routerService.navigate(['']);
      },
      (error)=>{
        this.canLoadin = true;
      });
  }
}
export class UserLogin {
  user!: string;
  pass!: string;
}
