import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressKladrComponent } from './adress-kladr.component';

describe('AdressKladrComponent', () => {
  let component: AdressKladrComponent;
  let fixture: ComponentFixture<AdressKladrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressKladrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressKladrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
