import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  private _authSubscription: Subscription;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authSubscription = this._authService.authChange.subscribe(authStatus => this.isAuth = authStatus);
  }

  ngOnDestroy(): void {
    this._authSubscription.unsubscribe();
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this._authService.logout();
  }
}
