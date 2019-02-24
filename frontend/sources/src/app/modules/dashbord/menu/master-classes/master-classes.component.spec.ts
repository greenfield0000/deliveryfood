import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterClassesComponent } from './master-classes.component';

describe('MasterClassesComponent', () => {
  let component: MasterClassesComponent;
  let fixture: ComponentFixture<MasterClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
