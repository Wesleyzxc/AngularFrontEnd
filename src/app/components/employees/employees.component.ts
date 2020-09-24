import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  constructor(public tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    if (!this.tokenService.loggedIn) {
      this.router.navigate(['/']);
    }
  }
}
