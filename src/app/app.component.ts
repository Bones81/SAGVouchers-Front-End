import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SAG NY Background Actor Calculator';
  showFormLink = true
  toggleFormLink(): void {
    this.showFormLink = !this.showFormLink
  }
}
