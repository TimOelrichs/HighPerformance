import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformaceViewComponent } from './performace-view.component';

describe('PerformaceViewComponent', () => {
  let component: PerformaceViewComponent;
  let fixture: ComponentFixture<PerformaceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformaceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
