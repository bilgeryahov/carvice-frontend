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
  private _subscriptions: Subscription[] = [];
  private _alerts: IAlert[] = [];

  private set _sub(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  public get alerts(): IAlert[] {
    return this._alerts;
  }

  public get isAuth(): boolean {
    return this._authService.isAuth
  }

  constructor(
    private _authService: AuthService,
    private _alertService: AlertService
  ) { }

  public ngOnInit(): void {
    this._sub = this._alertService.subject.subscribe((newAlert: IAlert) => {
      this._alerts.push(newAlert);
      setTimeout(() => {
        this._alerts.filter((alert: IAlert) => alert.id === newAlert.id)[0].closing = true;
        setTimeout(() => {
          this._alerts = this._alerts.filter((alert: IAlert) => alert.id !== newAlert.id);
        }, 250);
      }, 3000);
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
