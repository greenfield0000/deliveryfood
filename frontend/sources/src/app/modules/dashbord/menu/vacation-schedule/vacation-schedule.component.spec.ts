import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationScheduleComponent } from './vacation-schedule.component';

describe('VacationScheduleComponent', () => {
  let component: VacationScheduleComponent;
  let fixture: ComponentFixture<VacationScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
