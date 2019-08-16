import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOutletComponent } from './header-outlet.component';

describe('HeaderOutletComponent', () => {
  let component: HeaderOutletComponent;
  let fixture: ComponentFixture<HeaderOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
