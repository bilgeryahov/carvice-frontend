import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError, User } from 'firebase';
import { Subscription } from 'rxjs';
import { FirebaseErrorService } from './firebase-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  private _user: User = null;
  private _subscriptions: Subscription[] = [];

  private set _sub(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  public get isAuth(): boolean {
    return this._user !== null;
  }

  public get user(): User {
    return this._user;
  }

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private _router: Router,
    private _firebaseErrorService: FirebaseErrorService
  ) { }

  private _attachAuthListener(): void {
    this._sub = this._firebaseAuth.authState.subscribe((firebaseUser: User) => {
      if (firebaseUser) {
        this._user = firebaseUser;
        this._router.navigate(['/dashboard']);
        return;
      }
      this._user = null;
      this._router.navigate(['/home']);
    });
  }

  public ngOnInit(): void {
    this._attachAuthListener();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public signIn(email: string, password: string): void {
    this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((err: FirebaseError) => this._firebaseErrorService.onError(err));
  }

  public signOut(): void {
    this._firebaseAuth.auth.signOut();
  }
}
