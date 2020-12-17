import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManListComponent } from './sales-man-list.component';

describe('SalesManListComponent', () => {
  let component: SalesManListComponent;
  let fixture: ComponentFixture<SalesManListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesManListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesManListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
