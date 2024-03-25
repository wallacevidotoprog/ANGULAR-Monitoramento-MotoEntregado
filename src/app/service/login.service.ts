import { Injectable } from '@angular/core';
import {UserLogin} from '../components/login/login.component'
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  async Login(dataUser:UserLogin): Promise<object|any> {
    let obj!:object
    await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dataUser),
    }).then(async (res) => {
      obj = (await res.json()) as object;
    });
    return obj;
  }


  async VerifyToken():Promise<boolean|any> {
    let cot!:Boolean;
    await fetch('http://localhost:3000/api/verifyAuth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: this.getCookie('Authorization'),
      },
      credentials: 'include',
    }).then(async (res) => {
      const temp = await res.json();
      cot = temp.err
    }).catch((err)=>{cot = true;
    });
    return cot;
  }

  getCookie(cname: string): string {
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
