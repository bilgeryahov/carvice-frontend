import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { flatMap, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoaderService } from '../loader.service';

export abstract class DataEntityService<T> {
    private _dataEntityDBSegment = null;

    protected _path: string;

    // todo: think of handling errors

    constructor(
        protected _authService: AuthService,
        protected _firebaseFirestore: AngularFirestore,
        protected _loaderService: LoaderService

    ) {
        if (this._authService.isAuth)
            this._dataEntityDBSegment = `/users/${this._authService.userInfo.uid}`;
    }

    private _getFullPath(): string {
        return this._dataEntityDBSegment + this._path;
    }

    public subscribeCollectionValueChanges(): Observable<T[]> | Observable<never> {
        if (!this._authService.isAuth)
            return throwError('Not Authenticated');

        return this._firebaseFirestore.collection(this._getFullPath())
            .valueChanges({ idField: 'id' })
            .pipe(
                flatMap((data: Object[]) => {
                    if (data.length !== 0) {
                        return forkJoin(data.map((item: Object) => of(item as T)));
                    }
                    return of([] as T[]);
                })
            );
    }

    public createOne(dataEntity: T): Observable<any> {
        if (!this._authService.isAuth)
            return throwError('Not Authenticated');

        this._loaderService.show();

        return from(
            this._firebaseFirestore.collection(this._getFullPath())
                .add(dataEntity)
        ).pipe(
            mergeMap(
                () => {
                    this._loaderService.hide();
                    return of(undefined);
                }
            )
        );
    }

    public readMany(): Observable<T[]> | Observable<never> {
        if (!this._authService.isAuth)
            return throwError('Not Authenticated');

        this._loaderService.show();

        return this._firebaseFirestore.collection(this._getFullPath())
            .get()
            .pipe(
                flatMap(
                    (data: firebase.firestore.QuerySnapshot) => {
                        this._loaderService.hide();
                        if (data.docs.length !== 0) {
                            return forkJoin(
                                data.docs.map((item: firebase.firestore.QueryDocumentSnapshot) =>
                                    of(({ ...item.data(), id: item.id } as unknown as T))
                                )
                            );
                        }
                        return of([] as T[]);
                    }
                )
            );
    }

    public delete(dataEntityIds: string[]): Observable<any> {
        if (!this._authService.isAuth)
            return throwError('Not Authenticated');

        this._loaderService.show();

        return from(
            forkJoin(
                dataEntityIds.map((id: string) => this._firebaseFirestore.collection(this._getFullPath()).doc(`/${id}`).delete())
            )
        ).pipe(
            mergeMap(
                () => {
                    this._loaderService.hide();
                    return of(undefined);
                }
            )
        );
    }
}
