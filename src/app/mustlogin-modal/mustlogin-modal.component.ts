import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-mustlogin-modal',
  templateUrl: './mustlogin-modal.component.html',
  styleUrls: ['./mustlogin-modal.component.css'],
})
export class MustloginModalComponent {
  constructor(public modalRef: MdbModalRef<MustloginModalComponent>) {}
}
