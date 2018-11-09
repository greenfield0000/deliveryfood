import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOutletComponent } from './footer-outlet.component';

describe('FooterOutletComponent', () => {
  let component: FooterOutletComponent;
  let fixture: ComponentFixture<FooterOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
