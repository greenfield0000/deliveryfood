import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryStepperComponent } from './registry-stepper.component';

describe('RegistryStepperComponent', () => {
  let component: RegistryStepperComponent;
  let fixture: ComponentFixture<RegistryStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
