import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange: Subject<boolean>;
  private _isAuth: boolean;

  constructor(private _router: Router, private _afAuth: AngularFireAuth) {
    this.authChange = new Subject<boolean>();
    this._isAuth = false;
  }

  initAuthListener() {
    this._afAuth.authState.subscribe(user => {
      if (user) {
        this._isAuth = true;
        this.authChange.next(true);
        this._router.navigate(['/dashboard']);
        return;
      }
      this._isAuth = false;
      this.authChange.next(false);
      if (!this._router.url.endsWith('login') && !this._router.url.endsWith('signup')) {
        this._router.navigate(['/']);
      }
    });
  }

  registerUser(email: string, password: string) {
    // TODO: Better error handling.
    // TODO: Set display name via fullName.
    this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(err => console.error(err));
  }

  login(email: string, password: string) {
    // TODO: Better error handling.
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(err => console.error(err));
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  isAuth() {
    return this._isAuth;
  }
}
