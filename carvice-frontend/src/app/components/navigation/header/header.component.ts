import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  private _authSubscription: Subscription;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authSubscription = this._authService.authChange.subscribe(authStatus => this.isAuth = authStatus);
  }

  ngOnDestroy(): void {
    this._authSubscription.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this._authService.logout();
  }
}
