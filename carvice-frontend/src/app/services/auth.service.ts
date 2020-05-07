import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError, User, UserInfo } from 'firebase';
import { FirebaseErrorService } from './firebase-error.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User = null;
  private _fullNameUnset: string = null;

  public get isAuth(): boolean {
    return this._user !== null;
  }

  public get userInfo(): UserInfo {
    return {
      displayName: this._user.displayName,
      email: this._user.email,
      phoneNumber: this._user.phoneNumber,
      photoURL: this._user.photoURL,
      providerId: this._user.providerId,
      uid: this._user.uid
    } as UserInfo;
  }

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private _router: Router,
    private _firebaseErrorService: FirebaseErrorService,
    private _loaderService: LoaderService
  ) {
    this._attachAuthListener();
  }

  private _updateUser() {
    this._user.updateProfile({
      displayName: this._fullNameUnset
    })
      .then(() => this._fullNameUnset = null)
      .catch((err: FirebaseError) => this._firebaseErrorService.onError(err));
  }

  private _attachAuthListener(): void {
    this._firebaseAuth.authState.subscribe((firebaseUser: User) => {
      if (firebaseUser) {
        this._user = firebaseUser;
        if (this._fullNameUnset) {
          this._updateUser();
        }
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

  public signUp(email: string, password: string, fullName: string) {
    this._loaderService.show();
    this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this._loaderService.hide();
        this._fullNameUnset = fullName;
      })
      .catch((err: FirebaseError) => {
        this._loaderService.hide();
        this._firebaseErrorService.onError(err);
      });
  }

  public signOut(): void {
    // reload the page, so the Angular services re-instantiate
    this._firebaseAuth.auth.signOut().then(() => window.location.reload());
  }
}
