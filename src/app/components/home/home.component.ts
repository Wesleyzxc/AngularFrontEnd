import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public tokenService: TokenService) {}

  ngOnInit(): void {}
}
