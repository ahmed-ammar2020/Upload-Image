import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitForm() {
    this.userService.getUser(this.loginForm.value.email).subscribe((user) => {
      if (!user.length) {
        this.loginForm.setErrors({
          invalidUser: true,
        });
        this.userService.signedin$.next(false);
        localStorage.setItem('authenticated', 'false');
      } else {
        if (user[0].password === this.loginForm.value.password) {
          // successful login
          this._snackBar.open('Sucessful login', 'Ok', { duration: 1000 });
          this.router.navigate(['posts']);
          this.userService.signedin$.next(true);
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('username', user[0].username);
        } else {
          this.loginForm.setErrors({
            incorrectPassword: true,
          });
          this.userService.signedin$.next(false);
          localStorage.setItem('authenticated', 'false');
        }
      }
    });
  }
}
