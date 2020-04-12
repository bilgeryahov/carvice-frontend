import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from '../interfaces/IAlert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _subject: Subject<IAlert> = new Subject<IAlert>();

  public get subject(): Subject<IAlert> {
    return this._subject;
  }

  constructor() { }

  public success(message: string): void {
    this._subject.next({ success: true, message } as IAlert);
  }

  public error(debug: string): void {
    this.subject.next({ success: false, message: debug } as IAlert);
  }
}
