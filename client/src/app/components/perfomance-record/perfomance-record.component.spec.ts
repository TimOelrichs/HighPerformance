import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceRecordComponent } from './perfomance-record.component';

describe('PerfomanceRecordComponent', () => {
  let component: PerfomanceRecordComponent;
  let fixture: ComponentFixture<PerfomanceRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfomanceRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfomanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
