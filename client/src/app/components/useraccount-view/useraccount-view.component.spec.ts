import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccountViewComponent } from './useraccount-view.component';

describe('UseraccountViewComponent', () => {
  let component: UseraccountViewComponent;
  let fixture: ComponentFixture<UseraccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraccountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
