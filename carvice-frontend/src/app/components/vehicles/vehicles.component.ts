import { Component, OnInit } from '@angular/core';
import { IVehicle } from 'src/app/interfaces/data-entities/IVehicle';
import { IHeaderPair } from 'src/app/interfaces/IHeaderPair';
import { VehicleService } from 'src/app/services/data/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  private _vehicles: IVehicle[] = [];

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

  ngOnInit() {
    this._vehicleService.getMany().subscribe(
      (vehicles: IVehicle[]) => this._vehicles = vehicles
    );
  }
}
