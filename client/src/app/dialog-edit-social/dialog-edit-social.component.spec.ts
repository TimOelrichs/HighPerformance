import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSocialComponent } from './dialog-edit-social.component';

describe('DialogEditSocialComponent', () => {
  let component: DialogEditSocialComponent;
  let fixture: ComponentFixture<DialogEditSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
