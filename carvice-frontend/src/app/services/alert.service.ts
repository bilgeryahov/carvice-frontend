import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as uuid from "uuid";
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
    this._subject.next({ id: uuid.v4(), success: true, message, closing: false } as IAlert);
  }

  public error(debug: string): void {
    this.subject.next({ id: uuid.v4(), success: false, message: debug, closing: false } as IAlert);
  }
}
