import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  show: boolean = false; // show hidden div
  errorMsg: string = '';

  userRegForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    let email = this.userRegForm.controls['email'].value;
    let password = this.userRegForm.controls['password'].value;
    if (this.userRegForm.valid) {
      // valid details
      this.show = false;
      this.errorMsg = '';
      console.log(email);
      console.log(password);
    } else {
      //invalid email or missing pw
      this.show = true;
      if (!password) this.errorMsg = 'Please choose a password!';
      else this.errorMsg = 'Please check your email format!';
    }
  }
}
