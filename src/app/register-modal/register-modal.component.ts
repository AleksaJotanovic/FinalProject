import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
  userData: any;

  constructor(
    public modalRef: MdbModalRef<RegisterModalComponent>,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData;
  }

  resendVerificationMail() {
    this.authService.sendVerificationMail();
  }
}
