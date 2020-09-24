import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000'; // local env
  token: string;
  loggedIn: boolean = false;

  logIn(email: string, password: string) {
    let request = this.http
      .post(this.url + '/login', {
        email: email,
        password: password,
      })
      .toPromise()
      .then((res) => {
        if (res['token']) {
          this.loggedIn = true;
          this.token = res['token'];
        }
        return res;
      })
      .catch((err) => {
        return err;
      });
    return request;
  }

  logOut() {
    this.token = '';
    this.loggedIn = false;
  }
}
