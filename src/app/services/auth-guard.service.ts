import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DummyAuthService } from './dummy-auth.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private dummyAuth: DummyAuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.dummyAuth.getAuth().pipe(
      tap(auth => {
        if (!auth) {
          this.router.navigateByUrl('messages');
        }
      })
    );
  }
}
