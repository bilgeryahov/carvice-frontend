import { Injectable } from '@angular/core';
import { FirebaseError } from 'firebase';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {
  constructor(
    private _alertService: AlertService
  ) { }

  onError(err: FirebaseError): void {
    console.error(err);
    this._alertService.error(err.message);
  }
}
