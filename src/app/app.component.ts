import { Component, Output } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public tokenService: TokenService, private router: Router) {}
  public _opened: boolean = false;
  ngOnInit(): void {}

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  logOut() {
    this.router.navigate(['/']);
    this.tokenService.logOut();
    this._opened = false;
  }

  retainLogin(route: string) {
    this._toggleSidebar();
    this.router.navigate([route]);
    this.tokenService.loggedIn = true;
  }
}
