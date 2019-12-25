import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAddComponent } from './personal-add.component';

describe('PersonalAddComponent', () => {
  let component: PersonalAddComponent;
  let fixture: ComponentFixture<PersonalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
