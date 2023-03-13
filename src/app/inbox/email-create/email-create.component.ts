import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  email: Email;
  showModal: boolean = false;
  constructor(private emailService: EmailService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      text: '',
      html: '',
      from: `${localStorage.getItem('username')}@angular-email.com`,
    };
  }

  ngOnInit(): void {}

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
