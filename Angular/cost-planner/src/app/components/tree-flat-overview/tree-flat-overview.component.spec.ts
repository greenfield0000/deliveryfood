import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeFlatOverviewComponent } from './tree-flat-overview.component';

describe('TreeFlatOverviewComponent', () => {
  let component: TreeFlatOverviewComponent;
  let fixture: ComponentFixture<TreeFlatOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeFlatOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeFlatOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
