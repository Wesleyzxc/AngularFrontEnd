import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public tokenService: TokenService) {}

  ngOnInit(): void {}
}
