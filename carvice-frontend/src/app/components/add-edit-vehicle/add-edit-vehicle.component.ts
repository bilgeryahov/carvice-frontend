import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/data-entities/IVehicle';
import { AlertService } from 'src/app/services/alert.service';
import { VehicleService } from 'src/app/services/data/vehicle.service';

@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
export class AddEditVehicleComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _addEditForm: FormGroup = null;
  private _vehiclesList: IVehicle[] = [];
  private _vehicle: IVehicle = {} as IVehicle;

  public editCheck: boolean = false;

  private set _sub(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  public get vehiclesList(): IVehicle[] {
    return this._vehiclesList;
  }

  public get addEditForm(): FormGroup {
    return this._addEditForm;
  }

  public get vehicle(): IVehicle {
    return this._vehicle;
  }

  public get chooseYourOptionString(): string {
    return 'Choose your option';
  }

  constructor(
    private _vehicleService: VehicleService,
    private _alertService: AlertService
  ) { }

  private _detailsReset(shouldResetEditCheck: boolean = true): void {
    this._addEditForm.reset();
    this._vehicle = {} as IVehicle;
    if (shouldResetEditCheck) {
      this.editCheck = false;
    }
  }

  private _populateVehicleModel(): void {
    this._vehicle.brand = this._addEditForm.value.brand;
    this._vehicle.model = this._addEditForm.value.model;
    this._vehicle.plate = this._addEditForm.value.plate;
    this._vehicle.type = this._addEditForm.value.type;
  }

  private _populateAddEditForm(): void {
    this._addEditForm.setValue({
      brand: this._vehicle.brand,
      model: this._vehicle.model,
      plate: this._vehicle.plate,
      type: this._vehicle.type
    });
  }

  private _saveNew(): void {
    this._sub = this._vehicleService.createOne(this._vehicle).subscribe(() => {
      this._alertService.success('Successfully created!');
      this._detailsReset();
    });
  }

  private _saveUpdate(): void {
    this._sub = this._vehicleService.updateOne(this._vehicle, this._vehicle.id).subscribe(() => {
      this._alertService.success('Successfully updated!');
      this._detailsReset();
    });
  }

  public ngOnInit(): void {
    this._addEditForm = new FormGroup({
      brand: new FormControl('', { validators: [Validators.required] }),
      model: new FormControl('', { validators: [Validators.required] }),
      plate: new FormControl('', { validators: [Validators.required] }),
      type: new FormControl('', { validators: [Validators.required] })
    });

    this._sub = this._vehicleService.collection().subscribe(
      (vehicles: IVehicle[]) => this._vehiclesList = vehicles
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public onSave(): void {
    this._populateVehicleModel();
    if (typeof this._vehicle.id === 'undefined') {
      this._saveNew();
    } else {
      this._saveUpdate();
    }
  }

  public onChangeVehicleSelect(id: string): void {
    if (!id || id === '') return;
    this._sub = this._vehicleService.readOne(id).subscribe((data: IVehicle | null) => {
      if (data !== null) {
        this._vehicle = data;
        this._populateAddEditForm();
      }
    });
  }

  public onChangeEditCheck(): void {
    this._detailsReset(false);
  }
}
