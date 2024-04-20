import { inject, Injectable } from '@angular/core';
import { DeliveryData } from '../components/services/services.component';
import { LoginService, RespAPI } from './login.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private api = inject(HttpClient);

  async xadd(dataDerivery: DeliveryData): Promise<object | any> {
    let obj!: object;
    await fetch('http://localhost:3000/api/delivery/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: GlobalFunction.getCookie('Authorization'),
      },
      credentials: 'include',
      body: JSON.stringify(dataDerivery),
    }).then(async (res) => {
      if (res.ok) {
        console.log('ENVIADO');
      }
      obj = (await res.json()) as object;
    });
    return obj;
  }
  

  add(dataDerivery: DeliveryData): Observable<RespAPI> {
    return this.api.post<RespAPI>(`${environment.API}api/delivery/add`,dataDerivery,{headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    withCredentials: true,
    })
  }
}
module GlobalFunction {
  export function getCookie(cname: string) {
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
