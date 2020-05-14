import { Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { flatMap, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoaderService } from '../loader.service';

// todo: think of handling errors
export abstract class DataEntityService<T> {
    protected abstract _path: string;

    constructor(
        @Inject(AuthService) protected _authService: AuthService,
        @Inject(AngularFirestore) protected _firebaseFirestore: AngularFirestore,
        @Inject(LoaderService) protected _loaderService: LoaderService
    ) { }

    private _getFullPath(): string {
        return `/users/${this._authService.userInfo.uid}` + this._path;
    }

    public collection(): Observable<T[]> | Observable<never> {
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

    public readOne(id: string): Observable<any> {
        if (!this._authService.isAuth)
            return throwError('Not Authenticated');

        this._loaderService.show();

        return from(
            this._firebaseFirestore.collection(this._getFullPath()).doc(`/${id}`).get()
        ).pipe(
            flatMap(
                (data: firebase.firestore.DocumentSnapshot) => {
                    this._loaderService.hide();
                    if (typeof data.id !== 'undefined' && data.id !== null) {
                        return of(({ ...data.data(), id: data.id } as unknown as T));
                    }
                    return of(null);
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

    public updateOne(dataEntity: T, id: string): Observable<any> {
        if (!this._authService.isAuth)
            return throwError('Not Authenticated');

        this._loaderService.show();

        delete dataEntity['id'];

        return from(
            this._firebaseFirestore.collection(this._getFullPath()).doc(`/${id}`).update(dataEntity)
        ).pipe(
            mergeMap(
                () => {
                    this._loaderService.hide();
                    return of(undefined);
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
