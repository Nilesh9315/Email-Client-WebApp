import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { EmailService } from '../email.service';
import { Email } from '../email';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email: Email;
  constructor(
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
    private route: Router
  ) {
    // this.activatedRoute.data.subscribe(({email}) => this.email = email);
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.emailService.getEmail(id).pipe(
            catchError((err) => {
              this.route.navigateByUrl('/inbox/not-found');
              return EMPTY;
            })
          );
        })
      )
      .subscribe((Email) => {
        this.email = Email;
      });
  }
}
