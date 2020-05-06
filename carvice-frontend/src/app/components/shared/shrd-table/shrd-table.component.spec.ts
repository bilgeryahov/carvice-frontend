import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShrdTableComponent } from './shrd-table.component';

describe('ShrdTableComponent', () => {
  let component: ShrdTableComponent;
  let fixture: ComponentFixture<ShrdTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShrdTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShrdTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
