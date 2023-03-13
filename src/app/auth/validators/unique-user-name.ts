import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUserName implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;
    return this.auth.userNameAvailable(value).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
        console.log(err);
        return of({ nonUniqueUserName: true });
      })
    );
  };
}
