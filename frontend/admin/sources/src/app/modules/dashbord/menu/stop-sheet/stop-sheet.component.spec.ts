import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSheetComponent } from './stop-sheet.component';

describe('StopSheetComponent', () => {
  let component: StopSheetComponent;
  let fixture: ComponentFixture<StopSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
