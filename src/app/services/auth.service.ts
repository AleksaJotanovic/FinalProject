import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { User } from 'src/data';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  modalRef: MdbModalRef<RegisterModalComponent> | null = null;

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private modalService: MdbModalService
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      if (!this.isLoggedIn) {
        alert('Your logged out!');
      }
    });
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        data.user?.updateProfile({ displayName: `${firstName} ${lastName}` });
        this.sendVerificationMail();
        this.setUser(data.user);
        this.modalRef = this.modalService.open(RegisterModalComponent);
      })
      .catch((err) => console.log('Error while signing up the user: ', err));
  }

  signIn(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.router.navigate(['/']);
        this.ngZone.run(() => {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
        this.setUser(data.user);
        console.log(data.user?.displayName);
      })
      .catch((err) => console.log('Error when signing in the user: ', err));
  }

  sendVerificationMail() {
    this.fireAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .catch((err) =>
        console.log('Error while sending a verification mail: ', err)
      );
  }

  setUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user}`
    );

    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    };

    userRef.set(userData, { merge: true });
  }
}
