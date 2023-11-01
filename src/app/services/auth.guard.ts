import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MustloginModalComponent } from '../mustlogin-modal/mustlogin-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  modalRef: MdbModalRef<MustloginModalComponent> | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: MdbModalService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate([this.router.url]);
      this.modalRef = this.modalService.open(MustloginModalComponent);
    }
    return true;
  }
}
