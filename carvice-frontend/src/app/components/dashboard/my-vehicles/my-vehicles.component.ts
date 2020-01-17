import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.css']
})
export class MyVehiclesComponent implements OnInit, OnDestroy, AfterViewInit {
  columns = ['brand', 'model', 'plate'];
  dataSource = new MatTableDataSource<Vehicle>();
  private _vehiclesSub: Subscription;

  @ViewChild(MatSort, { static: false }) private _sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator;

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this._vehiclesSub = this._dataService.getResource('vehicle').subscribe(
      (vehicles: Vehicle[]) => this.dataSource.data = vehicles
    );
  }

  ngOnDestroy(): void {
    this._vehiclesSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this._sort;
    this.dataSource.paginator = this._paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
