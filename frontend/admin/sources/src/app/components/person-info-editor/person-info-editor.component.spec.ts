import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInfoEditorComponent } from './person-info-editor.component';

describe('PersonInfoEditorComponent', () => {
  let component: PersonInfoEditorComponent;
  let fixture: ComponentFixture<PersonInfoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonInfoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
