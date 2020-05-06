import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AddEditVehicleComponent } from './components/add-edit-vehicle/add-edit-vehicle.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { InspectVehicleComponent } from './components/inspect-vehicle/inspect-vehicle.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShrdTableComponent } from './components/shared/shrd-table/shrd-table.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { VehicleService } from './services/data/vehicle.service';
import { FirebaseErrorService } from './services/firebase-error.service';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    ProfileComponent,
    AboutusComponent,
    HomeComponent,
    LoaderComponent,
    VehiclesComponent,
    ShrdTableComponent,
    AddEditVehicleComponent,
    InspectVehicleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    AlertService,
    FirebaseErrorService,
    LoaderService,
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
