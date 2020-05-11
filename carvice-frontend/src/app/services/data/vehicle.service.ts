import { Injectable } from '@angular/core';
import { IVehicle } from 'src/app/interfaces/data-entities/IVehicle';
import { DataEntityService } from './dataentity.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends DataEntityService<IVehicle> {
    protected _path = '/vehicles';
}
