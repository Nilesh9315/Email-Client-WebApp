import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedIn: BehaviorSubject<boolean>;
  title = 'emailClient';

  constructor(private AuthService: AuthService) {
    this.signedIn = this.AuthService.signedin$;
  }

  ngOnInit() {
    this.AuthService.checkAuth().subscribe(() => {});
  }
}
