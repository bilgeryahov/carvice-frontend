import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError, User } from 'firebase';
import { FirebaseErrorService } from './firebase-error.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User = null;

  public get isAuth(): boolean {
    return this._user !== null;
  }

  public get user(): User {
    return this._user;
  }

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private _router: Router,
    private _firebaseErrorService: FirebaseErrorService,
    private _loaderService: LoaderService
  ) {
    this._attachAuthListener();
  }

  private _attachAuthListener(): void {
    this._firebaseAuth.authState.subscribe((firebaseUser: User) => {
      if (firebaseUser) {
        this._user = firebaseUser;
        this._router.navigate(['/dashboard']);
        return;
      }
      this._user = null;
      this._router.navigate(['/home']);
    });
  }

  public signIn(email: string, password: string): void {
    this._loaderService.show();
    this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => this._loaderService.hide())
      .catch((err: FirebaseError) => {
        this._loaderService.hide();
        this._firebaseErrorService.onError(err);
      });
  }

  public signOut(): void {
    this._firebaseAuth.auth.signOut();
  }
}
