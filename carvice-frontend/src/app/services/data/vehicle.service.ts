import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IVehicle } from 'src/app/interfaces/data-entities/IVehicle';
import { AuthService } from '../auth.service';
import { DataEntityService } from './dataentity.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends DataEntityService<IVehicle> {
    constructor(
        protected _authService: AuthService,
        protected _firebaseFirestore: AngularFirestore
    ) {
        super(_authService, _firebaseFirestore);
        this._path = '/vehicles'
    }
}
