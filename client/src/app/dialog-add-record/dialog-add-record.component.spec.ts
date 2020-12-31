import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddRecordComponent } from './dialog-add-record.component';

describe('DialogAddRecordComponent', () => {
  let component: DialogAddRecordComponent;
  let fixture: ComponentFixture<DialogAddRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
