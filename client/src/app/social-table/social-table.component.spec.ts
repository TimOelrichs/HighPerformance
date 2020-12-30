import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialTableComponent } from './social-table.component';

describe('SocialTableComponent', () => {
  let component: SocialTableComponent;
  let fixture: ComponentFixture<SocialTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
