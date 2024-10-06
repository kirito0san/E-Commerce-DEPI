import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports:[FormsModule],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  email: string = '';
  sendEmail() {
    if (this.email) {
      window.location.href = `mail to:${this.email}`;
    } else {
      alert("please enter a valid email adress")
    }
  }
}
