import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  getAuth() {
    return of(true).pipe(delay(1000));
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${environment.apiUrl}/auth`);
  }

  checkToken(token: string) {
    return of(true).pipe(delay(200));
  }
}
