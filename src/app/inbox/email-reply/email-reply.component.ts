import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';


@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent {
  @Input() email: Email;
  showModal: boolean = false;
  constructor( private emailService:EmailService) {}

  ngOnChanges() {
    this.email ={
      ...this.email,
      from: this.email.to,
      to:this.email.from,
      subject: `RE:${this.email.subject}`,
      text: `\n\n\n------${this.email.from} wrote:\n${this.email.text}`
    }
  }

  onSubmit(email:Email) {
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal=false
    })
  }
}
