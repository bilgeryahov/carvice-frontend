import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSharedFormComponent } from './auth-shared-form.component';

describe('AuthSharedFormComponent', () => {
  let component: AuthSharedFormComponent;
  let fixture: ComponentFixture<AuthSharedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSharedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSharedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
