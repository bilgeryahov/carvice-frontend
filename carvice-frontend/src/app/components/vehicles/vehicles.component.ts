import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/data-entities/IVehicle';
import { IHeaderPair } from 'src/app/interfaces/IHeaderPair';
import { VehicleService } from 'src/app/services/data/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _vehicles: IVehicle[] = [];
  private _selectedVehicleIds: string[] = [];

  private set _sub(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  public get selectedVehicleIds(): string[] {
    return this._selectedVehicleIds;
  }

  public get vehicles(): IVehicle[] {
    return this._vehicles;
  }

  public get vehiclesHeaders(): IHeaderPair[] {
    return [
      { header: 'Plate', attribute: 'plate' } as IHeaderPair,
      { header: 'Brand', attribute: 'brand' } as IHeaderPair,
      { header: 'Model', attribute: 'model' } as IHeaderPair,
      { header: 'Type', attribute: 'type' } as IHeaderPair
    ];
  }

  public get vehiclesSelectable(): boolean {
    return true;
  }

  public get vehiclesPalette(): string {
    return 'w3-indigo'
  }

  constructor(
    private _vehicleService: VehicleService
  ) { }

  private _fetchVehicles(): void {
    this._sub = this._vehicleService.readMany().subscribe(
      (vehicles: IVehicle[]) => this._vehicles = vehicles
    );
  }

  public ngOnInit() {
    this._fetchVehicles();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public onSelectedVehiclesChange(selectedIds: string[]): void {
    this._selectedVehicleIds = selectedIds;
  }

  public onDeleteVehicles(): void {
    this._vehicleService.delete(this._selectedVehicleIds).subscribe(() => this._fetchVehicles());
  }
}
