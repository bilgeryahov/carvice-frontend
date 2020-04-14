import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILoader } from '../interfaces/ILoader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loaderSubject = new Subject<ILoader>();

  public get loaderState(): Observable<ILoader> {
    return this._loaderSubject.asObservable();
  }

  show() {
    this._loaderSubject.next({ show: true } as ILoader);
  }

  hide() {
    this._loaderSubject.next({ show: false } as ILoader);
  }
}