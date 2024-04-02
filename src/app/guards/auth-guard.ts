import { booleanAttribute, inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root',
})
class eAuthGuard {
  private auth = inject(LoginService);
  private routerService = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | any {
    return this.auth
    .eVerifyToken()
    .subscribe((res) => {
      if (res.err) {
        return !res.err
      }
      return !res.err
    },
    (error)=>{
      return false
    });

  }
}
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(eAuthGuard).canActivate(route, state);
};
