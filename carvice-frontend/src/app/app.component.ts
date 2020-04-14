import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAlert } from './interfaces/IAlert';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _alertMsg: IAlert = null;
  private _subscriptions: Subscription[] = [];

  private set _sub(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  public get alertMsg(): IAlert {
    return this._alertMsg;
  }

  public get isAuth(): boolean {
    return this._authService.isAuth
  }

  public get alertPanelClass(): Object {
    return {
      'w3-panel w3-round w3-card-4': true,
      'w3-green': this._alertMsg && this._alertMsg.success,
      'w3-orange': this._alertMsg && !this._alertMsg.success
    }
  }

  constructor(
    private _authService: AuthService,
    private _alertService: AlertService
  ) { }

  public ngOnInit(): void {
    this._sub = this._alertService.subject.subscribe((alertMsg: IAlert) => {
      this._alertMsg = alertMsg;
      setTimeout(() => this._alertMsg = null, 3000);
    });
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public onSignOut(): void {
    this._authService.signOut();
  }

  public pathNameMatches(path: string): boolean {
    return window.location.pathname.includes(path);
  }
}
