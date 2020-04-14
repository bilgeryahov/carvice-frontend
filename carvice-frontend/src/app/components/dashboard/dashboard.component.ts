import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public get userInfo(): UserInfo {
    return this._authService.userInfo;
  }

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

}
