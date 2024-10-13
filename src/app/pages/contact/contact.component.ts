import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  comment: string = '';

  sendEmail() {
    const subject = `A hug from ${this.name}`;
    const body = `Name: ${this.name}\nEmail: ${this.email}\nComment: ${this.comment}`;
    const mailtoLink = `mailto:BearHugs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's default mail client with pre-filled details
    window.location.href = mailtoLink;
  }
}
