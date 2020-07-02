import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private store: Store,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      tap(auth => {
        if (!auth) {
          this.router.navigateByUrl('login');
        }
      })
    );
  }
}
