import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private userService: UserService) {
    if (localStorage.getItem('authenticated')?.startsWith('t')) {
      this.userService.signedin$.next(true);
    } else {
      this.userService.signedin$.next(false);
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.userService.signedin$.next(false);
    localStorage.setItem('authenticated', 'false');
    localStorage.setItem('username', '');
  }
}
