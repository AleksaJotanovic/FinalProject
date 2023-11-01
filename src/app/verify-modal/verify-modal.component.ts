import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.css'],
})
export class VerifyModalComponent {
  constructor(
    public modalRef: MdbModalRef<VerifyModalComponent>,
    private router: Router
  ) {}

  closeModal() {
    this.modalRef.close();
    this.router.navigate(['/login']);
  }
}
