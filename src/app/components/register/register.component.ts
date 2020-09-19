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

  userRegForm = this.formBuilder.group(
    {
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cPassword: ['', Validators.required],
    },
    {
      validator: this.checkPassword('password', 'cPassword'),
    }
  );

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
      if (this.userRegForm.get('fName').status == 'INVALID')
        this.errorMsg = 'Please enter first name!';
      else if (this.userRegForm.get('lName').status == 'INVALID')
        this.errorMsg = 'Please enter last name!';
      else if (this.userRegForm.get('email').status == 'INVALID')
        this.errorMsg = 'Please check your email format!';
      else if (this.userRegForm.get('password').status == 'INVALID')
        this.errorMsg = 'Please enter a password longer than 6 characters!';
      else if (this.userRegForm.get('cPassword').status == 'INVALID')
        this.errorMsg = 'Your password does not match!';
    }
  }

  checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
