import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // data fields
  private _sidebarOpenStyle: Object = {
    'width': '100%',
    'fontSize': '40px',
    'paddingTop': '10%',
    'display': 'block'
  };

  private _sidebarClosedStyle: Object = {
    'display': 'none'
  };

  private _sidebarVisible: boolean = false;

  // methods
  public setSidebarVisibility(): Object {
    if (this._sidebarVisible) {
      return this._sidebarOpenStyle;
    }
    return this._sidebarClosedStyle;
  }

  public openSidebar(): void {
    this._sidebarVisible = true;
  }

  public closeSidebar(): void {
    this._sidebarVisible = false;
  }
}
