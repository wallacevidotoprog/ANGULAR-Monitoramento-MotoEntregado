import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../components/login/login.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private routerService = inject(Router);
  private api = inject(HttpClient);

  eLogin(dataUser: UserLogin){
    return  this.api.post<RespAPI>('http://localhost:3000/api/login', dataUser,{
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },withCredentials:true
    })
  }

  eVerifyToken():Observable<RespAPI>{
    const cookie = this.getCookie('Authorization');
    return this.api.get<RespAPI>('http://localhost:3000/api/verifyAuth',{
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': cookie,
      },withCredentials:true
    })
  }

  public getCookie(cname: string) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}

export interface  RespAPI{
  err:boolean|any;
  menssage:string|any;
}
