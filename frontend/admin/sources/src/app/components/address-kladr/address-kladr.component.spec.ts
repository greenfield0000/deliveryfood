import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressKladrComponent } from './address-kladr.component';

describe('AddressKladrComponent', () => {
  let component: AddressKladrComponent;
  let fixture: ComponentFixture<AddressKladrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressKladrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressKladrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
