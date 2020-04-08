import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // properties
  public isAuth = () => false;

  constructor(private _firebaseAuth: AngularFireAuth) { }
}
