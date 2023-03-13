import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserNameAvailableResponse {
  available: boolean;
}

interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpResponse {
  username: string;
}

interface authenticatedResponse {
  authenticated: boolean;
  username: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);
  username:string
  constructor(private http: HttpClient) {}

  userNameAvailable(value: any): Observable<any> {
    return this.http.post(this.rootUrl + '/auth/username', {
      username: value,
    });
  }

  signUp(credentials: SignUpCredentials) {
    return this.http
      .post<SignUpResponse>(this.rootUrl + '/auth/signup', credentials)
      .pipe(
        tap(({username}) => {
          this.signedin$.next(true);
          localStorage.setItem('username',username)
        })
      );
  }

  checkAuth() {
    return this.http.get(this.rootUrl + '/auth/signedin').pipe(
      tap((response: authenticatedResponse) => {
        this.signedin$.next(response.authenticated);
        localStorage.setItem('username',response.username)
      })
    );
  }

  signOut() {
    return this.http.post(this.rootUrl +'/auth/signout', {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signIn(credentials:SignInCredentials){
    return this.http.post<any>(this.rootUrl +'/auth/signin', credentials).pipe(
      tap((response) => {
        this.signedin$.next(true)
        localStorage.setItem('username',response.username)
      })
    );
  }
}
