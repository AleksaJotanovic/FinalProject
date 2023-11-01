import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userData: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData;
  }

  signIn(email: string, password: string) {
    this.authService.signIn(email, password);
  }
}
