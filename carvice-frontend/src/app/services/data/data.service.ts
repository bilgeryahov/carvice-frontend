import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseModel } from 'src/app/models/base.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _dbCollections = {
    vehicle: 'vehicles'
  };

  constructor(private _firestore: AngularFirestore) { }

  getResource(type: string): Observable<BaseModel[]> {
    return this._firestore.collection(this._dbCollections[type])
      .snapshotChanges()
      .pipe(map(arr => arr.map(doc => ({
        id: doc.payload.doc['id'],
        ...(doc.payload.doc.data() as object)
      }) as BaseModel)));
  }
}
