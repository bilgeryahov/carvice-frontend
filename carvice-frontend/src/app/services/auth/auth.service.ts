import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { UIService } from '../ui/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange: Subject<boolean>;
  private _isAuth: boolean;

  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _snackbar: MatSnackBar,
    private _uiService: UIService
  ) {
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
    // TODO: Set display name via fullName.
    this._uiService.loadingStateChanged.next(true);
    this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => this._uiService.loadingStateChanged.next(false))
      .catch(err => {
        this._uiService.loadingStateChanged.next(false);
        this._snackbar.open(err.message, null, { duration: 3000 });
      });
  }

  login(email: string, password: string) {
    this._uiService.loadingStateChanged.next(true);
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => this._uiService.loadingStateChanged.next(false))
      .catch(err => {
        this._uiService.loadingStateChanged.next(false);
        this._snackbar.open(err.message, null, { duration: 3000 });
      });
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  isAuth() {
    return this._isAuth;
  }
}
