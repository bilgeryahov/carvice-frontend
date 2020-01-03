import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule
    ]
})
export class MaterialModule { }
