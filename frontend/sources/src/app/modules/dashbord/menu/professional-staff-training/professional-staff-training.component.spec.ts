import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalStaffTrainingComponent } from './professional-staff-training.component';

describe('ProfessionalStaffTrainingComponent', () => {
  let component: ProfessionalStaffTrainingComponent;
  let fixture: ComponentFixture<ProfessionalStaffTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalStaffTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalStaffTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
