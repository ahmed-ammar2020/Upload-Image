import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  createAccForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  submitForm() {
    this.userService
      .createNewUser(this.createAccForm.value)
      .subscribe((newUser) => {
        this.router.navigate(['posts']);
        this.userService.signedin$.next(true);
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('username', newUser.username);
      });
  }
}
