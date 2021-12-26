import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface NewUser {
  email: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  createNewUser(user: NewUser) {
    return this.http.post<NewUser>('http://localhost:3000/users', user);
  }

  getUser(email: string) {
    return this.http.get<NewUser[]>(
      `http://localhost:3000/users?email=${email}`
    );
  }
}
