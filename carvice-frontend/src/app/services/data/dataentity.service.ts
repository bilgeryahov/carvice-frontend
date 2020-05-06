import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export abstract class DataEntityService<T> {
    private _dataEntityDBSegment = null;

    protected _path: string;

    constructor(
        protected _authService: AuthService,
        protected _firebaseFirestore: AngularFirestore

    ) {
        if (this._authService.isAuth)
            this._dataEntityDBSegment = `/users/${this._authService.userInfo.uid}`;
    }

    private _getFullPath(): string {
        return this._dataEntityDBSegment + this._path;
    }

    public getOne() { }

    public getMany(): Observable<T[]> | Observable<never> {
        if (!this._authService.isAuth)
            return throwError('Not Authenticated');

        return this._firebaseFirestore.collection(this._getFullPath())
            .get()
            .pipe(
                flatMap(
                    (data: firebase.firestore.QuerySnapshot) => forkJoin(
                        data.docs.map((item: firebase.firestore.QueryDocumentSnapshot) => of(({ ...item.data(), id: item.id } as unknown as T)))
                    )
                )
            )
    }
}
