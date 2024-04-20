import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private api = inject(HttpClient);
  constructor() {}

  getDropDown():Observable<any>{
    return this.api.get(`${environment.API}api/gets/dropmt`,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials:true
    })
  }
}
