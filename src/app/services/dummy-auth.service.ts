import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DummyAuthService {
  getAuth() {
    return of(false).pipe(delay(1000));
  }
}
