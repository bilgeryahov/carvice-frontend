import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectVehicleComponent } from './inspect-vehicle.component';

describe('InspectVehicleComponent', () => {
  let component: InspectVehicleComponent;
  let fixture: ComponentFixture<InspectVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
