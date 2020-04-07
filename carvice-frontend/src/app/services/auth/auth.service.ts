import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // properties
  public isAuth = () => true;

  constructor() { }
}
