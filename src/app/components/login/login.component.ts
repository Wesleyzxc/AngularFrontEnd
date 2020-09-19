import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  show: boolean = false; // show hidden div
  errorMsg: string = '';
  @Input() token: string;
  @Output() passToken: EventEmitter<string> = new EventEmitter();
  userRegForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let email = this.userRegForm.controls['email'].value;
    let password = this.userRegForm.controls['password'].value;
    if (this.userRegForm.valid) {
      // valid details
      this.show = false;
      this.errorMsg = '';
      this.token = this.tokenService.logIn(
        this.userRegForm.get('email').value,
        this.userRegForm.get('password').value
      );
      console.log(this.token);
      if (!this.token) {
        // login failed
        this.show = true;
        this.errorMsg = 'Please check your email/password combination.';
      } else {
        this.show = false;
        this.errorMsg = '';
      }
    } else {
      //invalid email or missing pw
      this.show = true;
      if (this.userRegForm.get('email').status != 'VALID')
        this.errorMsg = 'Please check your email format!';
      else if (this.userRegForm.get('password').status != 'VALID')
        this.errorMsg = 'Please enter your password!';
    }
  }
}
