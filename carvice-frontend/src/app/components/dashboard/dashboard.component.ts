import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _selectedTab: string = 'add-edit-vehicle';

  public get userInfo(): UserInfo {
    return this._authService.userInfo;
  }

  public get selectedTab(): string {
    return this._selectedTab;
  }

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  public onTabSelect(tab: string): void {
    this._selectedTab = tab;
  }

}
