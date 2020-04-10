import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  // data fields
  private _user: User = null;

  // properties
  public get isAuth(): boolean {
    return this._user !== null;
  }

  public get user(): User {
    return this._user;
  }

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private _router: Router
  ) { }

  public ngOnInit(): void {
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
}
