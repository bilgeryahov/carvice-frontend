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

  private set _sub(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  public get addEditForm(): FormGroup {
    return this._addEditForm;
  }

  constructor(
    private _vehicleService: VehicleService,
    private _alertService: AlertService
  ) { }

  private _addEditFormReset(): void {
    this._addEditForm.reset();
  }

  public ngOnInit(): void {
    this._addEditForm = new FormGroup({
      brand: new FormControl('', { validators: [Validators.required] }),
      model: new FormControl('', { validators: [Validators.required] }),
      plate: new FormControl('', { validators: [Validators.required] }),
      type: new FormControl('', { validators: [Validators.required] })
    });
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public onSave(): void {
    this._sub = this._vehicleService.createOne({
      brand: this._addEditForm.value.brand,
      model: this._addEditForm.value.model,
      plate: this._addEditForm.value.plate,
      type: this._addEditForm.value.type
    } as IVehicle).subscribe(() => {
      this._alertService.success('Successfully saved!');
      this._addEditFormReset();
    });
  }
}
