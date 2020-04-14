import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILoader } from '../../interfaces/ILoader';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = null;
  private _show: boolean = false;

  public get show(): boolean {
    return this._show;
  }

  constructor(private _loaderService: LoaderService) { }

  ngOnInit() {
    this._subscription = this._loaderService.loaderState
      .subscribe((state: ILoader) => this._show = state.show);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}