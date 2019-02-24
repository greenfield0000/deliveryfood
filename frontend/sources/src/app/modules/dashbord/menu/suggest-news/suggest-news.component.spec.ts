import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestNewsComponent } from './suggest-news.component';

describe('SuggestNewsComponent', () => {
  let component: SuggestNewsComponent;
  let fixture: ComponentFixture<SuggestNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
